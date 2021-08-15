import { Module } from "@nestjs/common"
import { ExpenseMicroserviceModule } from "src/microservices/expense/expense.module"
import { IdentityMicroserviceModule } from "src/microservices/identity/identity.module"
import { LogMicroserviceModule } from "src/microservices/log/log.module"
import { BalancesController } from "./balances.controller"

@Module({
	imports: [ExpenseMicroserviceModule, LogMicroserviceModule, IdentityMicroserviceModule],
	controllers: [BalancesController],
	providers: [],
})
export class BalancesModule {}
