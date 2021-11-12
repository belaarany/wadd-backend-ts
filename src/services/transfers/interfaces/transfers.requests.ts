import { Type } from "class-transformer"
import { ArrayUnique, IsArray, IsDateString, IsEnum, IsNotEmpty, ValidateNested } from "class-validator"
import { Currency } from "src/interfaces/enums/Currency"
import { IsWaddObjectId } from "src/validators/IsWaddObjectIs"

class CreateTransferRpcRequest_Transfer {
	@IsNotEmpty()
	@IsWaddObjectId()
	source_wallet_id: string

	@IsNotEmpty()
	source_amount: number

	@IsNotEmpty()
	@IsEnum(Currency)
	source_currency: Currency

	@IsNotEmpty()
	@IsWaddObjectId()
	target_wallet_id: string

	@IsNotEmpty()
	target_amount: number

	@IsNotEmpty()
	@IsEnum(Currency)
	target_currency: Currency

	@IsNotEmpty()
	@IsDateString()
	timestamp: Date

	@IsNotEmpty()
	note: string
}

export class CreateTransferRpcRequest {
	@ValidateNested()
	@Type(() => CreateTransferRpcRequest_Transfer)
	transfer: CreateTransferRpcRequest_Transfer
}

export class ListWalletTransfersRpcRequest {
	@IsNotEmpty()
	@IsArray()
	@ArrayUnique()
	@IsWaddObjectId({ each: true })
	walletIds: string[]
}

export class TransferExistsRpcRequest {
	@IsNotEmpty()
	@IsWaddObjectId()
	transferId: string
}
