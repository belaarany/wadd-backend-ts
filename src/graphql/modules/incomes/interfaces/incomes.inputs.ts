import { Field, InputType } from "@nestjs/graphql"
import { ArrayUnique, IsArray, IsEnum, IsNotEmpty, IsOptional } from "class-validator"
import { Currency } from "src/interfaces/types/Currency"
import { IsWaddObjectId } from "src/validators/IsWaddObjectIs"

@InputType()
export class CreateIncomeGQLInput {
	@Field()
	@IsNotEmpty()
	wallet_id: string

	@Field()
	@IsNotEmpty()
	amount: number

	@Field()
	@IsNotEmpty()
	@IsEnum(Currency)
	currency: Currency

	@Field()
	@IsNotEmpty()
	// TODO: check
	// @IsDateString()
	timestamp: Date

	@Field()
	@IsNotEmpty()
	location: string

	@Field(() => [String])
	@IsNotEmpty()
	@IsArray()
	@ArrayUnique()
	@IsWaddObjectId({ each: true })
	related_expense_ids: string[]

	@Field()
	@IsNotEmpty()
	note: string

	@Field()
	@IsNotEmpty()
	category_id: string

	@Field(() => [String])
	@IsNotEmpty()
	@IsArray()
	@ArrayUnique()
	tags: string[]

	@Field({ nullable: true })
	@IsNotEmpty()
	@IsOptional()
	group_id: string | null

	@Field(() => [String])
	@IsNotEmpty()
	@IsArray()
	@ArrayUnique()
	@IsWaddObjectId({ each: true })
	attachment_file_ids: string[]
}
