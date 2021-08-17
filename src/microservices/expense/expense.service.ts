import { Inject, Injectable, Logger } from "@nestjs/common"
import { ClientProxy } from "@nestjs/microservices"
import { Category } from "src/interfaces/category.interface"
import { Expense } from "src/interfaces/expense.interface"
import { Income } from "src/interfaces/income.interface"
import { Wallet } from "src/interfaces/wallet.interface"
import { CreateCategoryDto, CreateExpenseDto, CreateIncomeDto, CreateTransferDto, CreateWalletDto } from "./expense.dto"

@Injectable()
export class ExpenseMicroservice {
	constructor(@Inject("EXPENSE_SERVICE") private client: ClientProxy) {}

	async createWallet(walletData: CreateWalletDto): Promise<Wallet> {
		const response = await this.client.send("wallets.create-wallet", { wallet: walletData }).toPromise()

		if (response.error) {
			Logger.error("Microservice replied with an error:")
			console.error(response)
			throw new Error("Microservice replied with an error")
		}

		return response
	}

	async listUserWallets(userId: string): Promise<Wallet[]> {
		const response = await this.client.send("wallets.list-user-wallets", { userId: userId }).toPromise()

		if (response.error) {
			Logger.error("Microservice replied with an error:")
			console.error(response)
			throw new Error("Microservice replied with an error")
		}

		return response
	}

	async listWallets(walletIds: string[]): Promise<Wallet[]> {
		const response = await this.client.send("wallets.list-wallets", { walletIds: walletIds }).toPromise()

		if (response.error) {
			Logger.error("Microservice replied with an error:")
			console.error(response)
			throw new Error("Microservice replied with an error")
		}

		return response
	}

	async walletExists(walletId: string): Promise<boolean> {
		const response = await this.client.send("wallets.wallet-exists", { walletId: walletId }).toPromise()

		if (response.error) {
			Logger.error("Microservice replied with an error:")
			console.error(response)
			throw new Error("Microservice replied with an error")
		}

		return response
	}

	async createIncome(incomeData: CreateIncomeDto): Promise<Income> {
		const response = await this.client.send("incomes.create-income", { income: incomeData }).toPromise()

		if (response.error) {
			Logger.error("Microservice replied with an error:")
			console.error(response)
			throw new Error("Microservice replied with an error")
		}

		return response
	}

	async listWalletIncomes(walletIds: string[]): Promise<Income[]> {
		const response = await this.client.send("incomes.list-wallet-incomes", { walletIds: walletIds }).toPromise()

		if (response.error) {
			Logger.error("Microservice replied with an error:")
			console.error(response)
			throw new Error("Microservice replied with an error")
		}

		return response
	}

	async createTransfer(transferData: CreateTransferDto): Promise<Income> {
		const response = await this.client.send("transfers.create-transfer", { transfer: transferData }).toPromise()

		if (response.error) {
			Logger.error("Microservice replied with an error:")
			console.error(response)
			throw new Error("Microservice replied with an error")
		}

		return response
	}

	async listWalletTransfers(walletIds: string[]): Promise<Income[]> {
		const response = await this.client.send("transfers.list-wallet-transfers", { walletIds: walletIds }).toPromise()

		if (response.error) {
			Logger.error("Microservice replied with an error:")
			console.error(response)
			throw new Error("Microservice replied with an error")
		}

		return response
	}

	async getIncomesSummary(walletId: string): Promise<Income[]> {
		const response = await this.client.send("incomes.get-summary", { walletId: walletId }).toPromise()

		if (response.error) {
			Logger.error("Microservice replied with an error:")
			console.error(response)
			throw new Error("Microservice replied with an error")
		}

		return response
	}

	async createCategory(categoryData: CreateCategoryDto): Promise<Category> {
		const response = await this.client.send("categories.create-category", { category: categoryData }).toPromise()

		if (response.error) {
			Logger.error("Microservice replied with an error:")
			console.error(response)
			throw new Error("Microservice replied with an error")
		}

		return response
	}

	async listUserCategories(userId: string): Promise<Category[]> {
		const response = await this.client.send("categories.list-user-categories", { userId: userId }).toPromise()

		if (response.error) {
			Logger.error("Microservice replied with an error:")
			console.error(response)
			throw new Error("Microservice replied with an error")
		}

		return response
	}

	async listCategories(categoryIds: string[]): Promise<Category[]> {
		const response = await this.client.send("categories.list-categories", { categoryIds: categoryIds }).toPromise()

		if (response.error) {
			Logger.error("Microservice replied with an error:")
			console.error(response)
			throw new Error("Microservice replied with an error")
		}

		return response
	}

	async getBalances(walletIds: string[]): Promise<any> {
		const response = await this.client.send("balances.get-balances", { walletIds: walletIds }).toPromise()

		if (response.error) {
			Logger.error("Microservice replied with an error:")
			console.error(response)
			throw new Error("Microservice replied with an error")
		}

		return response
	}

	async createExpense(expenseData: CreateExpenseDto): Promise<Expense> {
		const response = await this.client.send("expenses.create-expense", { expense: expenseData }).toPromise()

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
}
