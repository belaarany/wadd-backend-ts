import { Module } from "@nestjs/common"
import { ExpenseMicroserviceModule } from "src/microservices/expense/expense.module"
import { IdentityMicroserviceModule } from "src/microservices/identity/identity.module"
import { LogMicroserviceModule } from "src/microservices/log/log.module"
import { TransfersResolver } from "./transfers.resolver"

@Module({
	imports: [ExpenseMicroserviceModule, IdentityMicroserviceModule, LogMicroserviceModule],
	providers: [TransfersResolver],
})
export class TransfersGQLModule {}
