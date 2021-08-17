import { UseGuards } from "@nestjs/common"
import { Args, Info, Mutation, Query, Resolver } from "@nestjs/graphql"
import { Authorization, AuthUser } from "src/decorators/auth.decorator"
import { AuthGuard } from "src/guards/auth.guard"
import { Wallet } from "src/interfaces/wallet.interface"
import { LogMicroservice } from "src/microservices/log/log.service"
import { ExpenseMicroserviceWalletsService } from "../../../microservices/expense/services/wallets.service"
import { WalletGQLModel } from "./interfaces/wallet.model"
import { CreateWalletGQLInput } from "./interfaces/wallets.inputs"

@Resolver(() => WalletGQLModel)
export class WalletsResolver {
	constructor(
		private expenseMicroserviceWalletsService: ExpenseMicroserviceWalletsService,
		private logMicroservice: LogMicroservice,
	) {}

	@UseGuards(AuthGuard)
	@Mutation(() => WalletGQLModel)
	async createWallet(@Authorization() authUser: AuthUser, @Args("data") data: CreateWalletGQLInput): Promise<Wallet> {
		const wallet = await this.expenseMicroserviceWalletsService.createWallet({
			name: data.name,
			order: data.order,
			owner_user_id: authUser.id,
			default_currency: data.default_currency,
			initial_balance: data.initial_balance,
			type: data.type,
			icon_file_id: data.icon_file_id,
		})

		this.logMicroservice.createLog({
			scope: "user",
			action: "wallet.create",
			user_id: wallet.owner_user_id,
			target_id: wallet.id,
			platform: null,
			data: {
				wallet: wallet,
			},
		})

		return wallet
	}

	@UseGuards(AuthGuard)
	@Query(() => [WalletGQLModel])
	async wallets(@Authorization() authUser: AuthUser, @Info() info): Promise<Wallet[]> {
		const wallets = await this.expenseMicroserviceWalletsService.listUserWallets(authUser.id)

		console.log(info.fieldNodes[0].selectionSet.selections.map((item) => item.name.value))

		return wallets
	}

	// @UseGuards(AuthGuard)
	// @Query(() => BalanceGQLModel)
	// async balances(@Authorization() authUser: AuthUser): Promise<any> {
	// 	const balances = await this.expenseMicroserviceWalletsService.getBalances(["wal_XZrrpjiQk7VI3eL7", "wal_kCqOXOLFlGcyVkHIm2", "wal_kCqOXOLFlGcyVkHIm"])
	//
	// 	return balances
	// }

	// @ResolveField(() => WalletBalanceGQLModel)
	// async balance(
	// 	@Parent() parent: WalletGQLModel,
	// 	@Loader(BalancesLoader) categoriesLoader: DataLoader<string, any>,
	// ): Promise<any> {
	// 	const balance = await categoriesLoader.load(parent.id)

	// 	return balance
	// }
}
