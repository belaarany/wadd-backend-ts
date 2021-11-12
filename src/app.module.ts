import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { GraphQLRootModule } from "./graphql/graphql.module"
import { HttpRootModule } from "./http/http.module"
import { CategoriesModule } from "./services/categories/categories.module"
import { ExpensesModule } from "./services/expenses/expenses.module"
import { IncomesModule } from "./services/incomes/incomes.module"
import { TransfersModule } from "./services/transfers/transfers.module"
import { WalletsModule } from "./services/wallets/wallets.module"

@Module({
	imports: [
		HttpRootModule,
		GraphQLRootModule,
		TypeOrmModule.forRoot({
			type: "mongodb",
			url: "mongodb://localhost",
			port: 27017,
			database: "wadd_expense",
			entities: [__dirname + "/**/*.entity{.ts,.js}"],
			useUnifiedTopology: true,
			useNewUrlParser: true,
		}),
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
