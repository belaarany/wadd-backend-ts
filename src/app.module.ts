import { Module } from "@nestjs/common"
import { WalletsModule } from "./routes/wallets/wallets.module"
import { IdentityModule } from "./routes/identity/identity.module"
import { BalancesModule } from "./routes/balances/balances.module"
import { IncomesModule } from "./routes/incomes/incomes.module"

@Module({
	imports: [IdentityModule, WalletsModule, BalancesModule, IncomesModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
