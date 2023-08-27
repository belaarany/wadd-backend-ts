import { Module } from "@nestjs/common"
import { CategoriesModule } from "src/domain/categories/categories.module"
import { ExpensesModule } from "src/domain/expenses/expenses.module"
import { IncomesModule } from "src/domain/incomes/incomes.module"
import { IncomesResolver } from "./incomes.resolver"
import { WalletsLoader } from "src/graphql/loaders/wallets.loader"
import { CategoriesLoader } from "src/graphql/loaders/categories.loader"
import { ExpensesLoader } from "src/graphql/loaders/expenses.loader"
import { WalletsModule } from "src/domain/wallets/wallets.module"

@Module({
  imports: [ExpensesModule, IncomesModule, CategoriesModule, WalletsModule],
  providers: [IncomesResolver, WalletsLoader, CategoriesLoader, ExpensesLoader],
})
export class IncomesGQLModule {}
