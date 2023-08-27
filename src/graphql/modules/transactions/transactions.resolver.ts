import { UseGuards } from "@nestjs/common"
import { Args, Info, Query, ResolveField, Resolver } from "@nestjs/graphql"
import { GraphQLResolveInfo } from "graphql"
import { AuthGuard } from "src/core/guards/auth.guard"
import { ExpensesService } from "src/domain/expenses/expenses.service"
import { Expense } from "src/domain/expenses/interfaces/expense.model"
import { IncomesService } from "src/domain/incomes/incomes.service"
import { Income } from "src/domain/incomes/interfaces/income.model"
import { Transfer } from "src/domain/transfers/interfaces/transfer.model"
import { TransfersService } from "src/domain/transfers/transfers.service"
import { ExpenseGQLModel } from "../expenses/interfaces/expense.model"
import { IncomeGQLModel } from "../incomes/interfaces/income.model"
import { TransferGQLModel } from "../transfers/interfaces/transfer.model"
import { TransactionGQLModel } from "./interfaces/category.model"

@Resolver(() => TransactionGQLModel)
export class CategoriesResolver {
  constructor(
    private expensesService: ExpensesService,
    private transfersService: TransfersService,
    private incomesService: IncomesService,
  ) {}

  @UseGuards(AuthGuard)
  @Query(() => TransactionGQLModel)
  async transactions(@Args("wallet_ids", { type: () => [String] }) walletIds: string[]): Promise<any> {
    return {
      kind: "transactions",
    }
  }

  @ResolveField(() => [IncomeGQLModel])
  async incomes(@Info() info: GraphQLResolveInfo): Promise<Income[]> {
    const incomes = await this.incomesService.listByWalletIds(info.variableValues.wallet_ids as string[])

    return incomes as Income[]
  }

  @ResolveField(() => [ExpenseGQLModel])
  async expenses(@Info() info: GraphQLResolveInfo): Promise<Expense[]> {
    const expenses = await this.expensesService.listByWalletIds(info.variableValues.wallet_ids as string[])

    return expenses as Expense[]
  }

  @ResolveField(() => [TransferGQLModel])
  async transfers(@Info() info: GraphQLResolveInfo): Promise<Transfer[]> {
    const transfers = await this.transfersService.listByWalletIds(info.variableValues.wallet_ids as string[])

    return transfers as Transfer[]
  }
}
