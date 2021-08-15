import { Field, InputType } from "@nestjs/graphql"
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Length, MaxLength } from "class-validator"
import { Currency } from "src/interfaces/types/Currency"
import { WalletType } from "src/interfaces/types/WalletType"
import { IsWaddObjectId } from "src/validators/IsWaddObjectIs"

@InputType()
export class CreateWalletGQLInput {
	@Field()
	@IsNotEmpty()
	@IsString()
	name: string

	@Field()
	@IsNotEmpty()
	@IsNumber()
	order: number

	@Field()
	@IsNotEmpty()
	@IsNumber()
	initial_balance: number

	@Field()
	@IsNotEmpty()
	@IsEnum(Currency)
	default_currency: Currency

	@Field()
	@IsNotEmpty()
	@IsEnum(WalletType)
	type: WalletType

	@Field({ nullable: true })
	@IsNotEmpty()
	@IsOptional()
	@IsWaddObjectId()
	icon_file_id: string | null
}
