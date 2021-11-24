import { UseGuards } from "@nestjs/common"
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql"
import DataLoader from "dataloader"
import { Loader } from "nestjs-dataloader"
import { Authorization, AuthUser } from "src/decorators/auth.decorator"
import { CategoryNotExistsException } from "src/exceptions/categoryNotExists.exception"
import { ExpenseNotExistsException } from "src/exceptions/expenseNotExists.exception"
import { CategoriesLoader } from "src/graphql/loaders/categories.loader"
import { ExpensesLoader } from "src/graphql/loaders/expenses.loader"
import { AuthGuard } from "src/guards/auth.guard"
import { CategoriesService } from "src/services/categories/categories.service"
import { ExpensesService } from "src/services/expenses/expenses.service"
import { Expense } from "src/services/expenses/interfaces/expense.model"
import { IncomesService } from "src/services/incomes/incomes.service"
import { Income } from "src/services/incomes/interfaces/income.model"
import { Wallet } from "src/services/wallets/interfaces/wallet.model"
import { WalletsLoader } from "../../loaders/wallets.loader"
import { CategoryGQLModel } from "../categories/interfaces/category.model"
import { ExpenseGQLModel } from "../expenses/interfaces/expense.model"
import { WalletGQLModel } from "../wallets/interfaces/wallet.model"
import { IncomeGQLModel } from "./interfaces/income.model"
import { CreateIncomeGQLInput } from "./interfaces/incomes.inputs"

@Resolver(() => IncomeGQLModel)
export class IncomesResolver {
	constructor(
		private expensesService: ExpensesService,
		private incomesService: IncomesService,
		private categoriesService: CategoriesService,
	) {}

	@UseGuards(AuthGuard)
	@Mutation(() => IncomeGQLModel)
	async createIncome(@Authorization() authUser: AuthUser, @Args("data") data: CreateIncomeGQLInput): Promise<Income> {
		if ((await this.categoriesService.exists(data.category_id)) === false) {
			throw new CategoryNotExistsException(data.category_id)
		}

		for (let related_expense_id of data.related_expense_ids) {
			if ((await this.expensesService.exists(related_expense_id)) === false) {
				throw new ExpenseNotExistsException(related_expense_id)
			}
		}

		const income = await this.incomesService.create(data)

		// this.logMicroservice.createLog({
		// 	scope: "user",
		// 	action: "income.create",
		// 	user_id: authUser.id,
		// 	target_id: income.id,
		// 	platform: null,
		// 	data: {
		// 		income: income,
		// 	},
		// })

		return income
	}

	@UseGuards(AuthGuard)
	@Query(() => [IncomeGQLModel])
	async incomes(@Args("wallet_ids", { type: () => [String] }) walletIds: string[]): Promise<Income[]> {
		const incomes = await this.incomesService.listByWalletIds(walletIds)

		return incomes
	}

	@ResolveField(() => WalletGQLModel)
	async wallet(
		@Parent() parent: IncomeGQLModel,
		@Loader(WalletsLoader) walletsLoader: DataLoader<string, Wallet>,
	): Promise<Wallet> {
		const wallet = await walletsLoader.load(parent.wallet_id)

		return wallet
	}

	@ResolveField(() => CategoryGQLModel)
	async category(
		@Parent() parent: IncomeGQLModel,
		@Loader(CategoriesLoader) categoriesLoader: DataLoader<string, Wallet>,
	): Promise<Wallet> {
		const category = await categoriesLoader.load(parent.category_id)

		return category
	}

	@ResolveField(() => [ExpenseGQLModel])
	async related_expenses(
		@Parent() parent: IncomeGQLModel,
		@Loader(ExpensesLoader) expensesLoader: DataLoader<string, Expense>,
	): Promise<Expense[]> {
		const expenses = await expensesLoader.loadMany(parent.related_expense_ids)

		return expenses as Expense[]
	}
}
