import { Module } from "@nestjs/common"
import { CategoriesModule } from "src/services/categories/categories.module"
import { ExpensesModule } from "src/services/expenses/expenses.module"
import { IncomesModule } from "src/services/incomes/incomes.module"
import { ExpensesResolver } from "./expenses.resolver"

@Module({
  imports: [ExpensesModule, IncomesModule, CategoriesModule],
  providers: [ExpensesResolver],
})
export class ExpensesGQLModule {}
