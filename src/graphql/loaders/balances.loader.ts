import { Injectable } from "@nestjs/common"
import * as DataLoader from "dataloader"
import { NestDataLoader } from "nestjs-dataloader"
import { Wallet } from "src/interfaces/wallet.interface"

import * as Lodash from "lodash"
import { ExpenseMicroserviceBalancesService } from "../../microservices/expense/services/balances.service";

@Injectable()
export class BalancesLoader implements NestDataLoader<string, any> {
	constructor(private expenseMicroserviceBalancesService: ExpenseMicroserviceBalancesService) {}

	generateDataLoader(): DataLoader<string, any> {
		return new DataLoader<string, any>(async (walletIds) => {
			const balances = await this.expenseMicroserviceBalancesService.getBalances(walletIds as string[])
			console.log({walletIds})
			let ret = Lodash.map(walletIds, (key) => ({ id: key, ...(balances["wallets"][key] || { HUF: 0 }) }))
			console.log({ret})
			return Promise.resolve(ret)
		})
	}
}
