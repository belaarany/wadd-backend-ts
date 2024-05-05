import { Injectable } from "@nestjs/common"
import * as DataLoader from "dataloader"
import { INestDataLoader, NestDataLoader } from "src/core/utils/data-loader"
import { WalletEntity } from "src/domain/wallets/schemas/wallet.entity"
import { WalletsService } from "src/domain/wallets/wallets.service"

@Injectable()
export class WalletsLoader extends NestDataLoader<WalletEntity> implements INestDataLoader<WalletEntity> {
  constructor(private walletsService: WalletsService) {
    super()

    this.dataLoader = this.generateDataLoader()
  }

  generateDataLoader(): DataLoader<string, WalletEntity> {
    return new DataLoader<string, WalletEntity>((walletIds) => this.walletsService.listByIds(walletIds as string[]))
  }
}
