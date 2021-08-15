import { Module } from "@nestjs/common"
import { GraphQLRootModule } from "./graphql/graphql.module"
import { HttpRootModule } from "./http/http.module"

@Module({
	imports: [HttpRootModule, GraphQLRootModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
