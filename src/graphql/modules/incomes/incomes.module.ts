import { Module } from "@nestjs/common"
import { CategoriesModule } from "src/services/categories/categories.module"
import { ExpensesModule } from "src/services/expenses/expenses.module"
import { IncomesModule } from "src/services/incomes/incomes.module"
import { IncomesResolver } from "./incomes.resolver"

@Module({
  imports: [ExpensesModule, IncomesModule, CategoriesModule],
  providers: [IncomesResolver],
})
export class IncomesGQLModule {}
