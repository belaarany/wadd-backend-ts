import { Module } from "@nestjs/common"
import { ExpenseMicroserviceModule } from "src/microservices/expense/expense.module"
import { IdentityMicroserviceModule } from "src/microservices/identity/identity.module"
import { LogMicroserviceModule } from "src/microservices/log/log.module"
import { WalletsResolver } from "./wallets.resolver"

@Module({
	imports: [ExpenseMicroserviceModule, IdentityMicroserviceModule, LogMicroserviceModule],
	providers: [WalletsResolver],
})
export class WalletsGQLModule {}
