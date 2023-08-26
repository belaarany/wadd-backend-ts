import { Module } from "@nestjs/common"
import { ExpensesModule } from "src/services/expenses/expenses.module"
import { ExpensesService } from "src/services/expenses/expenses.service"
import { IncomesModule } from "src/services/incomes/incomes.module"
import { IncomesService } from "src/services/incomes/incomes.service"
import { TransfersModule } from "src/services/transfers/transfers.module"
import { TransfersService } from "src/services/transfers/transfers.service"
import { CategoriesResolver } from "./transactions.resolver"

@Module({
  imports: [ExpensesModule, IncomesModule, TransfersModule],
  providers: [CategoriesResolver],
})
export class TransactionsGQLModule {}
