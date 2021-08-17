import { Inject, Logger } from "@nestjs/common"
import { ClientProxy } from "@nestjs/microservices"
import { Income } from "src/interfaces/income.interface"
import { CreateIncomeDto } from "../expense.dto"

export class ExpenseMicroserviceIncomesService {
	constructor(@Inject("EXPENSE_SERVICE") private client: ClientProxy) {}

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

	async getIncomesSummary(walletId: string): Promise<Income[]> {
		const response = await this.client.send("incomes.get-summary", { walletId: walletId }).toPromise()

		if (response.error) {
			Logger.error("Microservice replied with an error:")
			console.error(response)
			throw new Error("Microservice replied with an error")
		}

		return response
	}
}
