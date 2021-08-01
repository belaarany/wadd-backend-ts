import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common"
import { ApiCreatedResponse, ApiOperation, ApiTags } from "@nestjs/swagger"
import { Authorization, AuthUser } from "src/decorators/auth.decorator"
import { AuthGuard } from "src/guards/auth.guard"
import { CreateWalletHttpRequest, CreateWalletHttpResponseSuccess } from "./interfaces/wallets.requests"
import { WalletsService } from "./wallets.service"

@ApiTags("Wallets")
@Controller("wallets")
export class WalletsController {
	constructor(private walletsService: WalletsService) {}

	@Post()
	@UseGuards(AuthGuard)
	@ApiOperation({ summary: "Creates a new Wallet." })
	@ApiCreatedResponse({ description: "Wallet successfully created.", type: CreateWalletHttpResponseSuccess })
	async createWallet(
		@Authorization() authUser: AuthUser,
		@Body() body: CreateWalletHttpRequest,
	): Promise<CreateWalletHttpResponseSuccess> {
		const wallet = await this.walletsService.createWallet({
			name: body.name,
			order: body.order,
			owner_user_id: authUser.id,
			initial_balance: body.initial_balance,
			default_currency: body.default_currency,
			type: body.type,
			icon_file_id: body.icon_file_id,
		})

		return wallet
	}

	@Get()
	@UseGuards(AuthGuard)
	@ApiOperation({ summary: "Lists the Wallets of a given User." })
	async listUserWallets(@Authorization() authUser: AuthUser): Promise<any> {
		const wallets = this.walletsService.listUserWallets(authUser.id)

		return wallets
	}
}
