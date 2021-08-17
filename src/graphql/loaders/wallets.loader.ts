import { Injectable } from "@nestjs/common"
import * as DataLoader from "dataloader"
import { NestDataLoader } from "nestjs-dataloader"
import { Wallet } from "src/interfaces/wallet.interface"
import { ExpenseMicroservice } from "src/microservices/expense/expense.service"

@Injectable()
export class WalletsLoader implements NestDataLoader<string, Wallet> {
	constructor(private expenseMicroservice: ExpenseMicroservice) {}

	generateDataLoader(): DataLoader<string, Wallet> {
		return new DataLoader<string, Wallet>((walletIds) =>
			this.expenseMicroservice.listWallets(walletIds as string[]),
		)
	}
}
