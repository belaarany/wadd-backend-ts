import { Module } from "@nestjs/common"
import { ExpensesModule } from "src/domain/expenses/expenses.module"
import { ExpensesService } from "src/domain/expenses/expenses.service"
import { IncomesModule } from "src/domain/incomes/incomes.module"
import { IncomesService } from "src/domain/incomes/incomes.service"
import { TransfersModule } from "src/domain/transfers/transfers.module"
import { TransfersService } from "src/domain/transfers/transfers.service"
import { CategoriesResolver } from "./transactions.resolver"

@Module({
  imports: [ExpensesModule, IncomesModule, TransfersModule],
  providers: [CategoriesResolver],
})
export class TransactionsGQLModule {}
