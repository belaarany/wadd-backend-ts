import { Module } from "@nestjs/common"
import { IncomesModule } from "../incomes/incomes.module"
import { BalancesController } from "./balances.controller"

@Module({
	imports: [IncomesModule],
	controllers: [BalancesController],
})
export class BalancesModule {}
