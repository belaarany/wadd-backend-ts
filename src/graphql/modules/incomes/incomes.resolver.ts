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
import { Expense } from "src/interfaces/expense.interface"
import { Income } from "src/interfaces/income.interface"
import { Wallet } from "src/interfaces/wallet.interface"
import { ExpenseMicroserviceCategoriesService } from "src/microservices/expense/services/categories.service"
import { ExpenseMicroserviceExpensesService } from "src/microservices/expense/services/expenses.service"
import { LogMicroservice } from "src/microservices/log/log.service"
import { ExpenseMicroserviceIncomesService } from "../../../microservices/expense/services/incomes.service"
import { WalletsLoader } from "../../loaders/wallets.loader"
import { CategoryGQLModel } from "../categories/interfaces/category.model"
import { ExpenseGQLModel } from "../expenses/interfaces/expense.model"
import { WalletGQLModel } from "../wallets/interfaces/wallet.model"
import { IncomeGQLModel } from "./interfaces/income.model"
import { CreateIncomeGQLInput } from "./interfaces/incomes.inputs"

@Resolver(() => IncomeGQLModel)
export class IncomesResolver {
	constructor(
		private expenseMicroserviceIncomesService: ExpenseMicroserviceIncomesService,
		private expenseMicroserviceExpensesService: ExpenseMicroserviceExpensesService,
		private expenseMicroserviceCategoriesService: ExpenseMicroserviceCategoriesService,
		private logMicroservice: LogMicroservice,
	) {}

	@UseGuards(AuthGuard)
	@Mutation(() => IncomeGQLModel)
	async createIncome(@Authorization() authUser: AuthUser, @Args("data") data: CreateIncomeGQLInput): Promise<Income> {
		if ((await this.expenseMicroserviceCategoriesService.categoryExists(data.category_id)) === false) {
			throw new CategoryNotExistsException(data.category_id)
		}

		for (let related_expense_id of data.related_expense_ids) {
			if (await this.expenseMicroserviceExpensesService.expenseExists(related_expense_id) === false) {
				throw new ExpenseNotExistsException(related_expense_id)
			}
		}

		const income = await this.expenseMicroserviceIncomesService.createIncome(data)

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
	@Query(() => [IncomeGQLModel])
	async incomes(@Args("wallet_ids", { type: () => [String] }) walletIds: string[]): Promise<Income[]> {
		const incomes = await this.expenseMicroserviceIncomesService.listWalletIncomes(walletIds)

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
