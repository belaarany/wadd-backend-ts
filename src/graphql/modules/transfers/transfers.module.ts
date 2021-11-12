import { Module } from "@nestjs/common"
import { TransfersModule } from "src/services/transfers/transfers.module"
import { TransfersService } from "src/services/transfers/transfers.service"
import { WalletsModule } from "src/services/wallets/wallets.module"
import { WalletsService } from "src/services/wallets/wallets.service"
import { TransfersResolver } from "./transfers.resolver"

@Module({
	imports: [TransfersModule, WalletsModule],
	providers: [TransfersResolver],
})
export class TransfersGQLModule {}
