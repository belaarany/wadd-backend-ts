import { Module } from "@nestjs/common"
import { CategoriesLoader } from "src/graphql/loaders/categories.loader"
import { IncomesLoader } from "src/graphql/loaders/incomes.loader"
import { WalletsLoader } from "src/graphql/loaders/wallets.loader"
import { CategoriesModule } from "src/services/categories/categories.module"
import { ExpensesModule } from "src/services/expenses/expenses.module"
import { IncomesModule } from "src/services/incomes/incomes.module"
import { ExpensesResolver } from "./expenses.resolver"
import { WalletsModule } from "src/services/wallets/wallets.module"

@Module({
  imports: [ExpensesModule, IncomesModule, CategoriesModule, WalletsModule],
  providers: [ExpensesResolver, WalletsLoader, CategoriesLoader, IncomesLoader],
})
export class ExpensesGQLModule {}
