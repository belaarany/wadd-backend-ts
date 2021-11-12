import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ExpenseEntity } from "./schemas/expense.entity"
import { ExpensesRepository } from "./expenses.repository"
import { ExpensesService } from "./expenses.service"

@Module({
	imports: [TypeOrmModule.forFeature([ExpenseEntity])],
	controllers: [],
	providers: [ExpensesService, ExpensesRepository],
	exports: [ExpensesService],
})
export class ExpensesModule {}
