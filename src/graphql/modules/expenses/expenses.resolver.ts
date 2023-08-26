import { UseGuards } from "@nestjs/common"
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql"
import DataLoader from "dataloader"
import { Loader } from "nestjs-dataloader"
import { Authorization, AuthUser } from "src/decorators/auth.decorator"
import { CategoryNotExistsException } from "src/exceptions/categoryNotExists.exception"
import { IncomeNotExistsException } from "src/exceptions/incomeNotExists.exception"
import { CategoriesLoader } from "src/graphql/loaders/categories.loader"
import { IncomesLoader } from "src/graphql/loaders/incomes.loader"
import { AuthGuard } from "src/guards/auth.guard"
import { LogMicroservice } from "src/microservices/log/log.service"
import { CategoriesService } from "src/services/categories/categories.service"
import { ExpensesService } from "src/services/expenses/expenses.service"
import { Expense } from "src/services/expenses/interfaces/expense.model"
import { IncomesService } from "src/services/incomes/incomes.service"
import { Income } from "src/services/incomes/interfaces/income.model"
import { Wallet } from "src/services/wallets/interfaces/wallet.model"
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

    // this.logMicroservice.createLog({
    // 	scope: "user",
    // 	action: "expense.create",
    // 	user_id: authUser.id,
    // 	target_id: expense.id,
    // 	platform: null,
    // 	data: {
    // 		expense: expense,
    // 	},
    // })

    return expense
  }

  @UseGuards(AuthGuard)
  @Query(() => [ExpenseGQLModel])
  async expenses(@Args("wallet_ids", { type: () => [String] }) walletIds: string[]): Promise<Expense[]> {
    const expenses = await this.expensesService.listByWalletIds(walletIds)

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

  @ResolveField(() => [IncomeGQLModel])
  async related_incomes(
    @Parent() parent: ExpenseGQLModel,
    @Loader(IncomesLoader) incomesLoader: DataLoader<string, Income>,
  ): Promise<Income[]> {
    const incomes = await incomesLoader.loadMany(parent.related_income_ids)

    return incomes as Income[]
  }
}
