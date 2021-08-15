import { Module } from "@nestjs/common"
import { ExpenseMicroserviceModule } from "src/microservices/expense/expense.module"
import { IdentityMicroserviceModule } from "src/microservices/identity/identity.module"
import { LogMicroserviceModule } from "src/microservices/log/log.module"
import { IncomesResolver } from "./incomes.resolver"

@Module({
	imports: [ExpenseMicroserviceModule, IdentityMicroserviceModule, LogMicroserviceModule],
	providers: [IncomesResolver],
})
export class IncomesGQLModule {}
