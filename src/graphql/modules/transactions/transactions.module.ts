import { Module } from "@nestjs/common"
import { ExpenseMicroserviceModule } from "src/microservices/expense/expense.module"
import { IdentityMicroserviceModule } from "src/microservices/identity/identity.module"
import { LogMicroserviceModule } from "src/microservices/log/log.module"
import { CategoriesResolver } from "./transactions.resolver"

@Module({
	imports: [ExpenseMicroserviceModule, IdentityMicroserviceModule, LogMicroserviceModule],
	providers: [CategoriesResolver],
})
export class TransactionsGQLModule {}
