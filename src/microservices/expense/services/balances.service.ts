import { Inject, Logger } from "@nestjs/common"
import { ClientProxy } from "@nestjs/microservices"

export class ExpenseMicroserviceBalancesService {
	constructor(@Inject("EXPENSE_SERVICE") private client: ClientProxy) {}

	async getBalances(walletIds: string[]): Promise<any> {
		const response = await this.client.send("balances.get-balances", { walletIds: walletIds }).toPromise()

		if (response.error) {
			Logger.error("Microservice replied with an error:")
			console.error(response)
			throw new Error("Microservice replied with an error")
		}

		return response
	}
}
