import { Module } from "@nestjs/common"
import { WalletsService } from "./wallets.service"
import { WalletsController } from "./wallets.controller"
import { ExpenseMicroserviceModule } from "src/microservices/expense/expense.module"
import { LogMicroserviceModule } from "src/microservices/log/log.module"
import { IdentityMicroserviceModule } from "src/microservices/identity/identity.module"

@Module({
	imports: [ExpenseMicroserviceModule, LogMicroserviceModule, IdentityMicroserviceModule],
	controllers: [WalletsController],
	providers: [WalletsService],
	exports: [],
})
export class WalletsModule {}
