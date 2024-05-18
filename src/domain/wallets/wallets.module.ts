import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { WalletEntity } from "./schemas/wallet.entity"
import { WalletsRepository } from "./wallets.repository"
import { WalletsService } from "./wallets.service"
import { WalletBalancesViewEntity } from "./schemas/wallet-balances.entity"

@Module({
  imports: [TypeOrmModule.forFeature([WalletEntity, WalletBalancesViewEntity])],
  controllers: [],
  providers: [WalletsService, WalletsRepository],
  exports: [WalletsService],
})
export class WalletsModule {}
