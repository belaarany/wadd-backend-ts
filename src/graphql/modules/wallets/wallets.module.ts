import { Module } from "@nestjs/common"
import { WalletsModule } from "src/domain/wallets/wallets.module"
import { WalletsService } from "src/domain/wallets/wallets.service"
import { WalletsResolver } from "./wallets.resolver"

@Module({
  imports: [WalletsModule],
  providers: [WalletsResolver],
})
export class WalletsGQLModule {}
