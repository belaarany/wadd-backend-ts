import { Injectable } from "@nestjs/common"
import { Wallet } from "src/interfaces/wallet.interface"
import { ExpenseMicroservice } from "src/microservices/expense/expense.service"
import { LogMicroservice } from "src/microservices/log/log.service"
import { CreateWalletDTO } from "./interfaces/wallets.dto"

@Injectable()
export class WalletsService {
	constructor(private expenseMicroservice: ExpenseMicroservice, private logMicroservice: LogMicroservice) {}

	async createWallet(walletData: CreateWalletDTO): Promise<Wallet> {
		const wallet = await this.expenseMicroservice.createWallet(walletData)

		this.logMicroservice.createLog({
			scope: "user",
			action: "wallet.create",
			user_id: wallet.owner_user_id,
			target_id: wallet.id,
			platform: null,
			data: {
				wallet: wallet,
			},
		})

		return wallet
	}

	async listUserWallets(userId: string): Promise<Wallet[]> {
		const wallets = await this.expenseMicroservice.listUserWallets(userId)

		return wallets
	}
}
