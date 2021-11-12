import { Field, InputType } from "@nestjs/graphql"
import { IsEnum, IsNotEmpty } from "class-validator"
import { Currency } from "src/interfaces/enums/Currency"
import { IsWaddObjectId } from "src/validators/IsWaddObjectIs"

@InputType()
export class CreateTransferGQLInput {
	@Field()
	@IsNotEmpty()
	@IsWaddObjectId()
	source_wallet_id: string

	@Field()
	@IsNotEmpty()
	source_amount: number

	@Field()
	@IsNotEmpty()
	@IsEnum(Currency)
	source_currency: Currency

	@Field()
	@IsNotEmpty()
	@IsWaddObjectId()
	target_wallet_id: string

	@Field()
	@IsNotEmpty()
	target_amount: number

	@Field()
	@IsNotEmpty()
	@IsEnum(Currency)
	target_currency: Currency

	@Field()
	@IsNotEmpty()
	// TODO: check
	// @IsDateString()
	timestamp: Date

	@Field()
	@IsNotEmpty()
	note: string
}
