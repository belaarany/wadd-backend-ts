import { Body, Controller, Get, HttpException, HttpStatus, Post, Query, UseGuards } from "@nestjs/common"
import { ApiOperation, ApiTags } from "@nestjs/swagger"
import { Authorization, AuthUser } from "src/decorators/auth.decorator"
import { WalletNotExistsException } from "src/exceptions/walletNotExists.exception"
import { AuthGuard } from "src/guards/auth.guard"
import { ExpenseMicroservice } from "src/microservices/expense/expense.service"
import { LogMicroservice } from "src/microservices/log/log.service"
import { CreateTransferHttpRequest, ListWalletTransfersHttpRequest } from "./interfaces/transfers.requests"

@ApiTags("Transfers")
@Controller("transfers")
export class TransfersController {
	constructor(private expenseMicroservice: ExpenseMicroservice, private logMicroservice: LogMicroservice) {}

	@Post()
	@UseGuards(AuthGuard)
	@ApiOperation({ summary: "Creates a new Transfer." })
	// TODO: Missing return type
	async createIncome(@Authorization() authUser: AuthUser, @Body() body: CreateTransferHttpRequest): Promise<any> {
		if ((await this.expenseMicroservice.walletExists(body.source_wallet_id)) === false) {
			throw new WalletNotExistsException(body.source_wallet_id)
		}

		if ((await this.expenseMicroservice.walletExists(body.target_wallet_id)) === false) {
			throw new WalletNotExistsException(body.target_wallet_id)
		}

		if (body.source_wallet_id === body.target_wallet_id) {
			throw new HttpException(
				{
					status: HttpStatus.BAD_REQUEST,
					error: `'source_wallet_id' and 'target_wallet_id' cannot be the same.`,
				},
				HttpStatus.BAD_REQUEST,
			)
		}

		const transfer = await this.expenseMicroservice.createTransfer(body)

		this.logMicroservice.createLog({
			scope: "user",
			action: "transfer.create",
			user_id: authUser.id,
			target_id: transfer.id,
			platform: null,
			data: {
				transfer: transfer,
			},
		})

		return transfer
	}

	@Get()
	@UseGuards(AuthGuard)
	@ApiOperation({ summary: "Lists the Transfers of a Wallet." })
	// TODO: Missing return type
	async listWalletIncomes(@Query() query: ListWalletTransfersHttpRequest): Promise<any> {
		if ((await this.expenseMicroservice.walletExists(query.wallet_id)) === false) {
			throw new WalletNotExistsException(query.wallet_id)
		}

		const transfers = await this.expenseMicroservice.listWalletTransfers([query.wallet_id])

		return transfers
	}
}
