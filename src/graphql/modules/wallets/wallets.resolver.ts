import { UseGuards } from "@nestjs/common"
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql"
import { Authorization, AuthUser } from "src/decorators/auth.decorator"
import { AuthGuard } from "src/guards/auth.guard"
import { Wallet } from "src/interfaces/wallet.interface"
import { ExpenseMicroservice } from "src/microservices/expense/expense.service"
import { LogMicroservice } from "src/microservices/log/log.service"
import { WalletGQLModel } from "./interfaces/wallet.model"
import { CreateWalletGQLInput } from "./interfaces/wallets.inputs"

@Resolver(() => WalletGQLModel)
export class WalletsResolver {
	constructor(private expenseMicroservice: ExpenseMicroservice, private logMicroservice: LogMicroservice) {}

	@UseGuards(AuthGuard)
	@Mutation(() => WalletGQLModel)
	async createWallet(@Authorization() authUser: AuthUser, @Args("data") data: CreateWalletGQLInput): Promise<Wallet> {
		const wallet = await this.expenseMicroservice.createWallet({
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
	async wallets(@Authorization() authUser: AuthUser): Promise<Wallet[]> {
		const wallets = await this.expenseMicroservice.listUserWallets(authUser.id)

		return wallets
	}
}
