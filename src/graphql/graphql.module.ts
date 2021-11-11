import { Module } from "@nestjs/common"
import { APP_INTERCEPTOR } from "@nestjs/core"
import { GraphQLModule } from "@nestjs/graphql"
import { DataLoaderInterceptor } from "nestjs-dataloader"
import { ExpenseMicroserviceModule } from "src/microservices/expense/expense.module"
import { IdentityMicroserviceModule } from "src/microservices/identity/identity.module"
import { LogMicroserviceModule } from "src/microservices/log/log.module"
import { BalancesLoader } from "./loaders/balances.loader"
import { CategoriesLoader } from "./loaders/categories.loader"
import { ExpensesLoader } from "./loaders/expenses.loader"
import { IncomesLoader } from "./loaders/incomes.loader"
import { UsersLoader } from "./loaders/users.loader"
import { WalletsLoader } from "./loaders/wallets.loader"
import { CategoriesGQLModule } from "./modules/categories/categories.module"
import { ExpensesGQLModule } from "./modules/expenses/expenses.module"
import { IncomesGQLModule } from "./modules/incomes/incomes.module"
import { TransactionsGQLModule } from "./modules/transactions/transactions.module"
import { TransfersGQLModule } from "./modules/transfers/transfers.module"
import { WalletsGQLModule } from "./modules/wallets/wallets.module"

@Module({
	imports: [
		ExpenseMicroserviceModule,
		IdentityMicroserviceModule,
		LogMicroserviceModule,
		WalletsGQLModule,
		IncomesGQLModule,
		ExpensesGQLModule,
		TransfersGQLModule,
		CategoriesGQLModule,
		TransactionsGQLModule,
		GraphQLModule.forRoot({
			autoSchemaFile: "schema.gql",
			playground: true,
		}),
	],
	controllers: [],
	providers: [
		UsersLoader,
		WalletsLoader,
		CategoriesLoader,
		BalancesLoader,
		ExpensesLoader,
		IncomesLoader,
		{
			provide: APP_INTERCEPTOR,
			useClass: DataLoaderInterceptor,
		},
	],
	exports: [UsersLoader, WalletsLoader],
})
export class GraphQLRootModule {}
