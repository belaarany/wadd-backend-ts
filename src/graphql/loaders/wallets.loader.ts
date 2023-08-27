import { Injectable } from "@nestjs/common"
import * as DataLoader from "dataloader"
import { INestDataLoader, NestDataLoader } from "src/core/utils/data-loader"
import { Wallet } from "src/domain/wallets/interfaces/wallet.model"
import { WalletsService } from "src/domain/wallets/wallets.service"

@Injectable()
export class WalletsLoader extends NestDataLoader<Wallet> implements INestDataLoader<Wallet> {
  constructor(private walletsService: WalletsService) {
    super()

    this.dataLoader = this.generateDataLoader()
  }

  generateDataLoader(): DataLoader<string, Wallet> {
    return new DataLoader<string, Wallet>((walletIds) => this.walletsService.listByIds(walletIds as string[]))
  }
}
