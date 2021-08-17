import { Injectable } from "@nestjs/common"
import * as DataLoader from "dataloader"
import { NestDataLoader } from "nestjs-dataloader"
import { Category } from "src/interfaces/category.interface"
import { Expense } from "src/interfaces/expense.interface"
import { ExpenseMicroservice } from "src/microservices/expense/expense.service"

@Injectable()
export class ExpensesLoader implements NestDataLoader<string, Expense> {
	constructor(private expenseMicroservice: ExpenseMicroservice) {}

	generateDataLoader(): DataLoader<string, Expense> {
		return new DataLoader<string, Expense>(async (expenseIds) => {
			console.log(expenseIds)
			let a = await this.expenseMicroservice.listWalletExpenses(expenseIds as string[])
			console.log(a)

			return Promise.resolve(a)
		}
		)
	}
}
