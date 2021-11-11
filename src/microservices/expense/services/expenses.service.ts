import { Inject, Logger } from "@nestjs/common"
import { ClientProxy } from "@nestjs/microservices"
import { Expense } from "src/interfaces/expense.interface"
import { CreateExpenseDto } from "../expense.dto"

export class ExpenseMicroserviceExpensesService {
	constructor(@Inject("EXPENSE_SERVICE") private client: ClientProxy) {}

	async createExpense(expenseData: CreateExpenseDto): Promise<Expense> {
		const response = await this.client.send("expenses.create-expense", { expense: expenseData }).toPromise()

		if (response.error) {
			Logger.error("Microservice replied with an error:")
			console.error(response)
			throw new Error("Microservice replied with an error")
		}

		return response
	}

	async listExpenses(expenseIds: string[]): Promise<Expense[]> {
		const response = await this.client.send("expenses.list-expenses", { expenseIds: expenseIds }).toPromise()

		if (response.error) {
			Logger.error("Microservice replied with an error:")
			console.error(response)
			throw new Error("Microservice replied with an error")
		}

		return response
	}

	async listWalletExpenses(walletIds: string[]): Promise<Expense[]> {
		const response = await this.client.send("expenses.list-wallet-expenses", { walletIds: walletIds }).toPromise()

		if (response.error) {
			Logger.error("Microservice replied with an error:")
			console.error(response)
			throw new Error("Microservice replied with an error")
		}

		return response
	}

	async expenseExists(expenseId: string): Promise<boolean> {
		const response = await this.client.send("expenses.expense-exists", { expenseId: expenseId }).toPromise()

		if (response.error) {
			Logger.error("Microservice replied with an error:")
			console.error(response)
			throw new Error("Microservice replied with an error")
		}

		return response
	}
}
