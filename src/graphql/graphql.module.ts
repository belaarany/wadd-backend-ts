import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo"
import { Module } from "@nestjs/common"
import { GraphQLModule } from "@nestjs/graphql"
import { join } from "path"
import { CategoriesModule } from "src/services/categories/categories.module"
import { ExpensesModule } from "src/services/expenses/expenses.module"
import { IncomesModule } from "src/services/incomes/incomes.module"
import { TransfersModule } from "src/services/transfers/transfers.module"
import { WalletsModule } from "src/services/wallets/wallets.module"
import { CategoriesLoader } from "./loaders/categories.loader"
import { ExpensesLoader } from "./loaders/expenses.loader"
import { IncomesLoader } from "./loaders/incomes.loader"
import { WalletsLoader } from "./loaders/wallets.loader"
import { CategoriesGQLModule } from "./modules/categories/categories.module"
import { ExpensesGQLModule } from "./modules/expenses/expenses.module"
import { IncomesGQLModule } from "./modules/incomes/incomes.module"
import { TransactionsGQLModule } from "./modules/transactions/transactions.module"
import { TransfersGQLModule } from "./modules/transfers/transfers.module"
import { WalletsGQLModule } from "./modules/wallets/wallets.module"

@Module({
  imports: [
    WalletsModule,
    CategoriesModule,
    IncomesModule,
    ExpensesModule,
    TransfersModule,
    WalletsGQLModule,
    CategoriesGQLModule,
    IncomesGQLModule,
    ExpensesGQLModule,
    TransfersGQLModule,
    TransactionsGQLModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "./src/graphql/schemas/schema.gql"),
      playground: true,
    }),
  ],
  controllers: [],
  providers: [WalletsLoader, CategoriesLoader, IncomesLoader, ExpensesLoader],
  exports: [],
})
export class GraphQLRootModule {}
