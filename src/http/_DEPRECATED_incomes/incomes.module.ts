import { Module } from "@nestjs/common"
import { ExpenseMicroserviceModule } from "src/microservices/expense/expense.module"
import { IdentityMicroserviceModule } from "src/microservices/identity/identity.module"
import { LogMicroserviceModule } from "src/microservices/log/log.module"
import { IncomesController } from "./incomes.controller"

@Module({
	imports: [ExpenseMicroserviceModule, LogMicroserviceModule, IdentityMicroserviceModule],
	controllers: [IncomesController],
	providers: [],
})
export class IncomesModule {}
