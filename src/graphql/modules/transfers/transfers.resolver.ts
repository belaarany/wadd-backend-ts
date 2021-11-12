import { HttpException, HttpStatus, UseGuards } from "@nestjs/common"
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql"
import DataLoader from "dataloader"
import { Loader } from "nestjs-dataloader"
import { Authorization, AuthUser } from "src/decorators/auth.decorator"
import { WalletNotExistsException } from "src/exceptions/walletNotExists.exception"
import { AuthGuard } from "src/guards/auth.guard"
import { Transfer } from "src/interfaces/transfer.interface"
import { Wallet } from "src/interfaces/wallet.interface"
import { TransfersService } from "src/services/transfers/transfers.service"
import { WalletsService } from "src/services/wallets/wallets.service"
import { WalletsLoader } from "../../loaders/wallets.loader"
import { WalletGQLModel } from "../wallets/interfaces/wallet.model"
import { TransferGQLModel } from "./interfaces/transfer.model"
import { CreateTransferGQLInput } from "./interfaces/transfers.inputs"


@Resolver(() => TransferGQLModel)
export class TransfersResolver {
	constructor(
		private walletsService: WalletsService,
		private transfersService: TransfersService,
	) {}

	@UseGuards(AuthGuard)
	@Mutation(() => TransferGQLModel)
	async createTransfer(
		@Authorization() authUser: AuthUser,
		@Args("data") data: CreateTransferGQLInput,
	): Promise<Transfer> {
		if ((await this.walletsService.exists(data.source_wallet_id)) === false) {
			throw new WalletNotExistsException(data.source_wallet_id)
		}

		if ((await this.walletsService.exists(data.target_wallet_id)) === false) {
			throw new WalletNotExistsException(data.target_wallet_id)
		}

		if (data.source_wallet_id === data.target_wallet_id) {
			throw new HttpException(
				{
					status: HttpStatus.BAD_REQUEST,
					error: `'source_wallet_id' and 'target_wallet_id' cannot be the same.`,
				},
				HttpStatus.BAD_REQUEST,
			)
		}

		const transfer = await this.transfersService.create(data)

		// this.logMicroservice.createLog({
		// 	scope: "user",
		// 	action: "transfer.create",
		// 	user_id: authUser.id,
		// 	target_id: transfer.id,
		// 	platform: null,
		// 	data: {
		// 		transfer: transfer,
		// 	},
		// })

		return transfer
	}

	@UseGuards(AuthGuard)
	@Query(() => [TransferGQLModel])
	async transfers(@Args("wallet_ids", { type: () => [String] }) walletIds: string[]): Promise<Transfer[]> {
		const incomes = await this.transfersService.listByWalletIds(walletIds)

		return incomes
	}

	@ResolveField(() => WalletGQLModel)
	async source_wallet(
		@Parent() parent: TransferGQLModel,
		@Loader(WalletsLoader) walletsLoader: DataLoader<string, Wallet>,
	): Promise<Wallet> {
		const wallet = await walletsLoader.load(parent.source_wallet_id)

		return wallet
	}

	@ResolveField(() => WalletGQLModel)
	async target_wallet(
		@Parent() parent: TransferGQLModel,
		@Loader(WalletsLoader) walletsLoader: DataLoader<string, Wallet>,
	): Promise<Wallet> {
		const wallet = await walletsLoader.load(parent.target_wallet_id)

		return wallet
	}
}
