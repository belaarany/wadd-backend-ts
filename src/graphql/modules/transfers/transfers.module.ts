import { Module } from "@nestjs/common"
import { TransfersModule } from "src/services/transfers/transfers.module"
import { WalletsModule } from "src/services/wallets/wallets.module"
import { TransfersResolver } from "./transfers.resolver"
import { WalletsLoader } from "src/graphql/loaders/wallets.loader"

@Module({
  imports: [TransfersModule, WalletsModule],
  providers: [TransfersResolver, WalletsLoader],
})
export class TransfersGQLModule {}
