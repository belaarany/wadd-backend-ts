import { UseGuards } from "@nestjs/common"
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql"
import { AuthUser, Authorization } from "src/core/decorators/auth.decorator"
import { CategoryNotExistsException } from "src/core/exceptions/categoryNotExists.exception"
import { ExpenseNotExistsException } from "src/core/exceptions/expenseNotExists.exception"
import { CategoriesLoader } from "src/graphql/loaders/categories.loader"
import { ExpensesLoader } from "src/graphql/loaders/expenses.loader"
import { AuthGuard } from "src/core/guards/auth.guard"
import { CategoriesService } from "src/domain/categories/categories.service"
import { ExpensesService } from "src/domain/expenses/expenses.service"
import { Expense } from "src/domain/expenses/interfaces/expense.model"
import { IncomesService } from "src/domain/incomes/incomes.service"
import { Income } from "src/domain/incomes/interfaces/income.model"
import { Wallet } from "src/domain/wallets/interfaces/wallet.model"
import { WalletsLoader } from "../../loaders/wallets.loader"
import { CategoryGQLModel } from "../categories/interfaces/category.model"
import { ExpenseGQLModel } from "../expenses/interfaces/expense.model"
import { WalletGQLModel } from "../wallets/interfaces/wallet.model"
import { IncomeGQLModel } from "./interfaces/income.model"
import { CreateIncomeGQLInput } from "./interfaces/incomes.inputs"
import { Category } from "src/domain/categories/interfaces/category.model"

@Resolver(() => IncomeGQLModel)
export class IncomesResolver {
  constructor(
    private expensesService: ExpensesService,
    private incomesService: IncomesService,
    private categoriesService: CategoriesService,
    private categoriesLoader: CategoriesLoader,
    private expensesLoader: ExpensesLoader,
    private walletsLoader: WalletsLoader,
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

    return income
  }

  @UseGuards(AuthGuard)
  @Query(() => [IncomeGQLModel])
  async incomes(@Args("wallet_ids", { type: () => [String] }) walletIds: string[]): Promise<Income[]> {
    const incomes = await this.incomesService.listByWalletIds(walletIds)

    return incomes
  }

  @ResolveField(() => WalletGQLModel)
  async wallet(@Parent() parent: IncomeGQLModel): Promise<Wallet> {
    const wallet = await this.walletsLoader.load(parent.wallet_id)

    return wallet
  }

  @ResolveField(() => CategoryGQLModel)
  async category(@Parent() parent: IncomeGQLModel): Promise<Category> {
    const category = await this.categoriesLoader.load(parent.category_id)

    return category
  }

  @ResolveField(() => [ExpenseGQLModel])
  async related_expenses(@Parent() parent: IncomeGQLModel): Promise<Expense[]> {
    const expenses = await this.expensesLoader.loadMany(parent.related_expense_ids)

    return expenses as Expense[]
  }
}
