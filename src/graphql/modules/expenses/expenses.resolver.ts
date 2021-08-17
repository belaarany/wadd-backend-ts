import { UseGuards } from "@nestjs/common"
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql"
import DataLoader from "dataloader"
import { Loader } from "nestjs-dataloader"
import { Authorization, AuthUser } from "src/decorators/auth.decorator"
import { CategoriesLoader } from "src/graphql/loaders/categories.loader"
import { AuthGuard } from "src/guards/auth.guard"
import { Expense } from "src/interfaces/expense.interface"
import { Wallet } from "src/interfaces/wallet.interface"
import { LogMicroservice } from "src/microservices/log/log.service"
import { ExpenseMicroserviceExpensesService } from "../../../microservices/expense/services/expenses.service"
import { WalletsLoader } from "../../loaders/wallets.loader"
import { CategoryGQLModel } from "../categories/interfaces/category.model"
import { WalletGQLModel } from "../wallets/interfaces/wallet.model"
import { ExpenseGQLModel } from "./interfaces/expense.model"
import { CreateExpenseGQLInput } from "./interfaces/expenses.inputs"

@Resolver(() => ExpenseGQLModel)
export class ExpensesResolver {
	constructor(
		private expenseMicroserviceExpensesService: ExpenseMicroserviceExpensesService,
		private logMicroservice: LogMicroservice,
	) {}

	@UseGuards(AuthGuard)
	@Mutation(() => ExpenseGQLModel)
	async createExpense(
		@Authorization() authUser: AuthUser,
		@Args("data") data: CreateExpenseGQLInput,
	): Promise<Expense> {
		const expense = await this.expenseMicroserviceExpensesService.createExpense(data)

		this.logMicroservice.createLog({
			scope: "user",
			action: "expense.create",
			user_id: authUser.id,
			target_id: expense.id,
			platform: null,
			data: {
				expense: expense,
			},
		})

		return expense
	}

	@UseGuards(AuthGuard)
	@Query(() => [ExpenseGQLModel])
	async expenses(@Args("wallet_ids", { type: () => [String] }) walletIds: string[]): Promise<Expense[]> {
		const expenses = await this.expenseMicroserviceExpensesService.listWalletExpenses(walletIds)

		return expenses
	}

	@ResolveField(() => WalletGQLModel)
	async wallet(
		@Parent() parent: ExpenseGQLModel,
		@Loader(WalletsLoader) walletsLoader: DataLoader<string, Wallet>,
	): Promise<Wallet> {
		const wallet = await walletsLoader.load(parent.wallet_id)

		return wallet
	}

	@ResolveField(() => CategoryGQLModel)
	async category(
		@Parent() parent: ExpenseGQLModel,
		@Loader(CategoriesLoader) categoriesLoader: DataLoader<string, Wallet>,
	): Promise<Wallet> {
		const category = await categoriesLoader.load(parent.category_id)

		return category
	}
}
