import { Injectable } from "@nestjs/common"
import * as DataLoader from "dataloader"
import * as Lodash from "lodash"

// @Injectable()
// export class BalancesLoader implements NestDataLoader<string, any> {
//   constructor(private expenseMicroserviceBalancesService: ExpenseMicroserviceBalancesService) {}

//   generateDataLoader(): DataLoader<string, any> {
//     return new DataLoader<string, any>(async (walletIds) => {
//       const balances = await this.expenseMicroserviceBalancesService.getBalances(walletIds as string[])
//       console.log({ walletIds })
//       const ret = Lodash.map(walletIds, (key) => ({ id: key, ...(balances["wallets"][key] || { HUF: 0 }) }))
//       console.log({ ret })
//       return Promise.resolve(ret)
//     })
//   }
// }
