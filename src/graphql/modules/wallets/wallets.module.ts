import { Module } from "@nestjs/common"
import { WalletsModule } from "src/services/wallets/wallets.module"
import { WalletsService } from "src/services/wallets/wallets.service"
import { WalletsResolver } from "./wallets.resolver"

@Module({
	imports: [WalletsModule],
	providers: [WalletsResolver],
})
export class WalletsGQLModule {}
