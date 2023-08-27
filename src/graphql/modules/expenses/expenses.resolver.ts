import { UseGuards } from "@nestjs/common"
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql"
import { AuthUser, Authorization } from "src/core/decorators/auth.decorator"
import { CategoryNotExistsException } from "src/core/exceptions/categoryNotExists.exception"
import { IncomeNotExistsException } from "src/core/exceptions/incomeNotExists.exception"
import { CategoriesLoader } from "src/graphql/loaders/categories.loader"
import { IncomesLoader } from "src/graphql/loaders/incomes.loader"
import { AuthGuard } from "src/core/guards/auth.guard"
import { CategoriesService } from "src/domain/categories/categories.service"
import { Category } from "src/domain/categories/interfaces/category.model"
import { ExpensesService } from "src/domain/expenses/expenses.service"
import { Expense } from "src/domain/expenses/interfaces/expense.model"
import { IncomesService } from "src/domain/incomes/incomes.service"
import { Income } from "src/domain/incomes/interfaces/income.model"
import { Wallet } from "src/domain/wallets/interfaces/wallet.model"
import { WalletsLoader } from "../../loaders/wallets.loader"
import { CategoryGQLModel } from "../categories/interfaces/category.model"
import { IncomeGQLModel } from "../incomes/interfaces/income.model"
import { WalletGQLModel } from "../wallets/interfaces/wallet.model"
import { ExpenseGQLModel } from "./interfaces/expense.model"
import { CreateExpenseGQLInput } from "./interfaces/expenses.inputs"

@Resolver(() => ExpenseGQLModel)
export class ExpensesResolver {
  constructor(
    private expensesService: ExpensesService,
    private categoriesService: CategoriesService,
    private incomesService: IncomesService,
    private categoriesLoader: CategoriesLoader,
    private incomesLoader: IncomesLoader,
    private walletsLoader: WalletsLoader,
  ) {}

  @UseGuards(AuthGuard)
  @Mutation(() => ExpenseGQLModel)
  async createExpense(
    @Authorization() authUser: AuthUser,
    @Args("data") data: CreateExpenseGQLInput,
  ): Promise<Expense> {
    if ((await this.categoriesService.exists(data.category_id)) === false) {
      throw new CategoryNotExistsException(data.category_id)
    }

    for (let related_income_id of data.related_income_ids) {
      if ((await this.incomesService.exists(related_income_id)) === false) {
        throw new IncomeNotExistsException(related_income_id)
      }
    }

    const expense = await this.expensesService.create(data)

    return expense
  }

  @UseGuards(AuthGuard)
  @Query(() => [ExpenseGQLModel])
  async expenses(@Args("wallet_ids", { type: () => [String] }) walletIds: string[]): Promise<Expense[]> {
    const expenses = await this.expensesService.listByWalletIds(walletIds)

    return expenses
  }

  @ResolveField(() => WalletGQLModel)
  async wallet(@Parent() parent: ExpenseGQLModel): Promise<Wallet> {
    const wallet = await this.walletsLoader.load(parent.wallet_id)

    return wallet
  }

  @ResolveField(() => CategoryGQLModel)
  async category(@Parent() parent: ExpenseGQLModel): Promise<Category> {
    const category = await this.categoriesLoader.load(parent.category_id)

    return category
  }

  @ResolveField(() => [IncomeGQLModel])
  async related_incomes(@Parent() parent: ExpenseGQLModel): Promise<Income[]> {
    const incomes = await this.incomesLoader.loadMany(parent.related_income_ids)

    return incomes as Income[]
  }
}
