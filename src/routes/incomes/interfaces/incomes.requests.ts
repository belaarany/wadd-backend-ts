import { ApiProperty } from "@nestjs/swagger"
import { ArrayUnique, IsArray, IsEnum, IsNotEmpty, IsOptional } from "class-validator"
import { Currency } from "src/interfaces/types/Currency"
import { IsWaddObjectId } from "src/validators/IsWaddObjectIs"

export class CreateIncomeHttpRequest {
	@ApiProperty()
	@IsNotEmpty()
	wallet_id: string

	@ApiProperty()
	@IsNotEmpty()
	amount: number

	@ApiProperty()
	@IsNotEmpty()
	@IsEnum(Currency)
	currency: Currency

	@ApiProperty()
	@IsNotEmpty()
	timestamp: Date

	@ApiProperty()
	@IsNotEmpty()
	location: string

	@ApiProperty()
	@IsNotEmpty()
	@IsArray()
	@ArrayUnique()
	@IsWaddObjectId({ each: true })
	related_expense_ids: string[]

	@ApiProperty()
	@IsNotEmpty()
	note: string

	@ApiProperty()
	@IsNotEmpty()
	category_id: string

	@ApiProperty()
	@IsNotEmpty()
	@IsArray()
	@ArrayUnique()
	tags: string[]

	@ApiProperty()
	@IsNotEmpty()
	@IsOptional()
	group_id: string | null

	@ApiProperty()
	@IsNotEmpty()
	@IsArray()
	@ArrayUnique()
	@IsWaddObjectId({ each: true })
	attachment_file_ids: string[]
}

export class ListWalletIncomesHttpRequest {
	@ApiProperty()
	@IsNotEmpty()
	@IsWaddObjectId()
	wallet_id: string
}
