import { Injectable } from "@nestjs/common"
import * as DataLoader from "dataloader"
import { NestDataLoader } from "nestjs-dataloader"
import { Wallet } from "src/interfaces/wallet.interface"
import { WalletsService } from "src/services/wallets/wallets.service"
import { ExpenseMicroserviceWalletsService } from "../../microservices/expense/services/wallets.service"

@Injectable()
export class WalletsLoader implements NestDataLoader<string, Wallet> {
	constructor(private walletsService: WalletsService) {}

	generateDataLoader(): DataLoader<string, Wallet> {
		return new DataLoader<string, Wallet>((walletIds) =>
			this.walletsService.listByIds(walletIds as string[]),
		)
	}
}
