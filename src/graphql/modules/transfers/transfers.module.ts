import { Module } from "@nestjs/common"
import { TransfersModule } from "src/domain/transfers/transfers.module"
import { WalletsModule } from "src/domain/wallets/wallets.module"
import { TransfersResolver } from "./transfers.resolver"
import { WalletsLoader } from "src/graphql/loaders/wallets.loader"

@Module({
  imports: [TransfersModule, WalletsModule],
  providers: [TransfersResolver, WalletsLoader],
})
export class TransfersGQLModule {}
