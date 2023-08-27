import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { WalletEntity } from "./schemas/wallet.entity"
import { WalletsRepository } from "./wallets.repository"
import { WalletsService } from "./wallets.service"

@Module({
  imports: [TypeOrmModule.forFeature([WalletEntity])],
  controllers: [],
  providers: [WalletsService, WalletsRepository],
  exports: [WalletsService],
})
export class WalletsModule {}
