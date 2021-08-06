import { HttpException, HttpStatus } from "@nestjs/common"

export class WalletNotExistsException extends HttpException {
	constructor(walletId: string) {
		super(
			{
				status: HttpStatus.BAD_REQUEST,
				error: `The specified Wallet ${walletId} doesn't exist.`,
			},
			HttpStatus.BAD_REQUEST,
		)
	}
}
