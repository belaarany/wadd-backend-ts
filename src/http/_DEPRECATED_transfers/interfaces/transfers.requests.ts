import { ApiProperty } from "@nestjs/swagger"
import { IsDateString, IsEnum, IsNotEmpty } from "class-validator"
import { Currency } from "src/interfaces/types/Currency"
import { IsWaddObjectId } from "src/validators/IsWaddObjectIs"

export class CreateTransferHttpRequest {
	@ApiProperty()
	@IsNotEmpty()
	@IsWaddObjectId()
	source_wallet_id: string

	@ApiProperty()
	@IsNotEmpty()
	source_amount: number

	@ApiProperty()
	@IsNotEmpty()
	@IsEnum(Currency)
	source_currency: Currency

	@ApiProperty()
	@IsNotEmpty()
	@IsWaddObjectId()
	target_wallet_id: string

	@ApiProperty()
	@IsNotEmpty()
	target_amount: number

	@ApiProperty()
	@IsNotEmpty()
	@IsEnum(Currency)
	target_currency: Currency

	@ApiProperty()
	@IsNotEmpty()
	@IsDateString()
	timestamp: Date

	@ApiProperty()
	@IsNotEmpty()
	note: string
}

export class ListWalletTransfersHttpRequest {
	@ApiProperty()
	@IsNotEmpty()
	@IsWaddObjectId()
	wallet_id: string
}
