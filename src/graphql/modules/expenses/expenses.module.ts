import { Module } from "@nestjs/common"
import { CategoriesLoader } from "src/graphql/loaders/categories.loader"
import { IncomesLoader } from "src/graphql/loaders/incomes.loader"
import { WalletsLoader } from "src/graphql/loaders/wallets.loader"
import { CategoriesModule } from "src/domain/categories/categories.module"
import { ExpensesModule } from "src/domain/expenses/expenses.module"
import { IncomesModule } from "src/domain/incomes/incomes.module"
import { ExpensesResolver } from "./expenses.resolver"
import { WalletsModule } from "src/domain/wallets/wallets.module"

@Module({
  imports: [ExpensesModule, IncomesModule, CategoriesModule, WalletsModule],
  providers: [ExpensesResolver, WalletsLoader, CategoriesLoader, IncomesLoader],
})
export class ExpensesGQLModule {}
