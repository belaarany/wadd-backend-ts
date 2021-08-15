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
import { IncomeGQLModel } from "./interfaces/income.model"
import { CreateIncomeGQLInput } from "./interfaces/incomes.inputs"

@Resolver((of) => IncomeGQLModel)
export class IncomesResolver {
	constructor(private expenseMicroservice: ExpenseMicroservice, private logMicroservice: LogMicroservice) {}

	@UseGuards(AuthGuard)
	@Mutation((returns) => IncomeGQLModel)
	async createIncome(@Authorization() authUser: AuthUser, @Args("data") data: CreateIncomeGQLInput): Promise<Income> {
		const income = await this.expenseMicroservice.createIncome(data)

		this.logMicroservice.createLog({
			scope: "user",
			action: "income.create",
			user_id: authUser.id,
			target_id: income.id,
			platform: null,
			data: {
				income: income,
			},
		})

		return income
	}

	@UseGuards(AuthGuard)
	@Query((returns) => [IncomeGQLModel])
	async incomes(@Args("wallet_ids", { type: () => [String] }) walletIds: string[]): Promise<Income[]> {
		const incomes = await this.expenseMicroservice.listWalletIncomes(walletIds)

		return incomes
	}

	@ResolveField((returns) => WalletGQLModel)
	async wallet(
		@Parent() parent: IncomeGQLModel,
		@Loader(WalletsLoader) walletsLoader: DataLoader<string, Wallet>,
	): Promise<Wallet> {
		const wallet = await walletsLoader.load(parent.wallet_id)

		return wallet
	}
}
