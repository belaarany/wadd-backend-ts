import { Inject, Logger } from "@nestjs/common"
import { ClientProxy } from "@nestjs/microservices"
import { Wallet } from "src/services/wallets/interfaces/wallet.model"
import { CreateWalletDto } from "../expense.dto"

export class ExpenseMicroserviceWalletsService {
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
}
