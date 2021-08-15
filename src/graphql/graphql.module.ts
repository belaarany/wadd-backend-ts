import { Module } from "@nestjs/common"
import { APP_INTERCEPTOR } from "@nestjs/core"
import { GraphQLModule } from "@nestjs/graphql"
import { DataLoaderInterceptor } from "nestjs-dataloader"
import { ExpenseMicroserviceModule } from "src/microservices/expense/expense.module"
import { IdentityMicroserviceModule } from "src/microservices/identity/identity.module"
import { LogMicroserviceModule } from "src/microservices/log/log.module"
import { UsersLoader } from "./loaders/users.loader"
import { WalletsLoader } from "./loaders/wallets.loader"
import { IncomesGQLModule } from "./modules/incomes/incomes.module"
import { TransfersGQLModule } from "./modules/transfers/transfer.module"
import { WalletsGQLModule } from "./modules/wallets/wallets.module"

@Module({
	imports: [
		ExpenseMicroserviceModule,
		IdentityMicroserviceModule,
		LogMicroserviceModule,
		WalletsGQLModule,
		IncomesGQLModule,
		TransfersGQLModule,
		GraphQLModule.forRoot({
			autoSchemaFile: "schema.gql",
			playground: true,
		}),
	],
	controllers: [],
	providers: [
		UsersLoader,
		WalletsLoader,
		{
			provide: APP_INTERCEPTOR,
			useClass: DataLoaderInterceptor,
		},
	],
	exports: [UsersLoader, WalletsLoader],
})
export class GraphQLRootModule {}
