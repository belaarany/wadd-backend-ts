import { UseGuards } from "@nestjs/common"
import { Args, Query, Resolver } from "@nestjs/graphql"
import { AuthGuard } from "src/core/guards/auth.guard"
import { ExpensesService } from "src/domain/expenses/expenses.service"
import { ExpenseEntity } from "src/domain/expenses/schemas/expense.entity"
import { IncomesService } from "src/domain/incomes/incomes.service"
import { IncomeEntity } from "src/domain/incomes/schemas/income.entity"
import { TransferEntity } from "src/domain/transfers/schemas/transfer.entity"
import { TransfersService } from "src/domain/transfers/transfers.service"
import { TransactionGQLUnion } from "./interfaces/transaction.model"
import { TransactionsFilterGQLInput } from "./interfaces/transactions.inputs"

@Resolver(() => TransactionGQLUnion)
export class CategoriesResolver {
  constructor(
    private expensesService: ExpensesService,
    private transfersService: TransfersService,
    private incomesService: IncomesService,
  ) {}

  @UseGuards(AuthGuard)
  @Query(() => [TransactionGQLUnion])
  async transactions(
    @Args("filter") data: TransactionsFilterGQLInput,
  ): Promise<(IncomeEntity | ExpenseEntity | TransferEntity)[]> {
    const incomes = await this.incomesService.listByWalletIds(data.wallet_ids)
    const expenses = await this.expensesService.listByWalletIds(data.wallet_ids)
    const transfers = await this.transfersService.listByWalletIds(data.wallet_ids)

    return [...incomes, ...expenses, ...transfers]
  }
}
