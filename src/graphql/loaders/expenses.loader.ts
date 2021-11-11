import { Injectable } from "@nestjs/common"
import * as DataLoader from "dataloader"
import { NestDataLoader } from "nestjs-dataloader"
import { Expense } from "src/interfaces/expense.interface"
import { ExpenseMicroserviceExpensesService } from "../../microservices/expense/services/expenses.service"

@Injectable()
export class ExpensesLoader implements NestDataLoader<string, Expense> {
	constructor(private expenseMicroserviceExpensesService: ExpenseMicroserviceExpensesService) {}

	generateDataLoader(): DataLoader<string, Expense> {
		return new DataLoader<string, Expense>((expenseIds) =>
			this.expenseMicroserviceExpensesService.listExpenses(expenseIds as string[]),
		)
	}
}
