import { Module } from "@nestjs/common"
import { InternalController } from "./internal.controller"
import { WalletsModule } from "src/domain/wallets/wallets.module"
import { CategoriesModule } from "src/domain/categories/categories.module"
import { ExpensesModule } from "src/domain/expenses/expenses.module"
import { IncomesModule } from "src/domain/incomes/incomes.module"
import { TransfersModule } from "src/domain/transfers/transfers.module"

@Module({
  imports: [WalletsModule, CategoriesModule, IncomesModule, ExpensesModule, TransfersModule],
  controllers: [InternalController],
})
export class InternalHttpModule {}
