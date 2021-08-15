import { UseGuards } from "@nestjs/common"
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql"
import DataLoader from "dataloader"
import { Loader } from "nestjs-dataloader"
import { Authorization, AuthUser } from "src/decorators/auth.decorator"
import { AuthGuard } from "src/guards/auth.guard"
import { Income } from "src/interfaces/income.interface"
import { Wallet } from "src/interfaces/wallet.interface"
import { ExpenseMicroservice } from "src/microservices/expense/expense.service"
import { LogMicroservice } from "src/microservices/log/log.service"
import { WalletsLoader } from "../../loaders/wallets.loader"
import { WalletGQLModel } from "../wallets/interfaces/wallet.model"
import { TransferGQLModel } from "./interfaces/transfer.model"
import { CreateTransferGQLInput } from "./interfaces/transfers.inputs"

@Resolver((of) => TransferGQLModel)
export class TransfersResolver {
	constructor(private expenseMicroservice: ExpenseMicroservice, private logMicroservice: LogMicroservice) {}

	@UseGuards(AuthGuard)
	@Mutation((returns) => TransferGQLModel)
	async createTransfer(@Authorization() authUser: AuthUser, @Args("data") data: CreateTransferGQLInput): Promise<Income> {
		const transfer = await this.expenseMicroservice.createTransfer(data)

		this.logMicroservice.createLog({
			scope: "user",
			action: "transfer.create",
			user_id: authUser.id,
			target_id: transfer.id,
			platform: null,
			data: {
				transfer: transfer,
			},
		})

		return transfer
	}

	@UseGuards(AuthGuard)
	@Query((returns) => [TransferGQLModel])
	async transfers(@Args("wallet_ids", { type: () => [String] }) walletIds: string[]): Promise<Income[]> {
		const incomes = await this.expenseMicroservice.listWalletTransfers(walletIds)

		return incomes
	}

	@ResolveField((returns) => WalletGQLModel)
	async source_wallet(
		@Parent() parent: TransferGQLModel,
		@Loader(WalletsLoader) walletsLoader: DataLoader<string, Wallet>,
	): Promise<Wallet> {
		const wallet = await walletsLoader.load(parent.source_wallet_id)

		return wallet
	}

	@ResolveField((returns) => WalletGQLModel)
	async target_wallet(
		@Parent() parent: TransferGQLModel,
		@Loader(WalletsLoader) walletsLoader: DataLoader<string, Wallet>,
	): Promise<Wallet> {
		const wallet = await walletsLoader.load(parent.target_wallet_id)

		return wallet
	}
}
