import { Field, InputType } from "@nestjs/graphql"
import { IsEnum, IsNotEmpty, IsOptional } from "class-validator"
import { Currency } from "src/core/interfaces/enums/Currency"
import { IsWaddObjectId } from "src/core/validators/IsWaddObjectIs"

@InputType()
export class CreateTransferGQLInput {
  @Field()
  @IsNotEmpty()
  // @IsWaddObjectId()
  source_wallet_id: string

  @Field()
  @IsNotEmpty()
  // @IsWaddObjectId()
  target_wallet_id: string

  @Field()
  @IsNotEmpty()
  amount: number

  @Field()
  @IsNotEmpty()
  // TODO: check
  // @IsDateString()
  timestamp: Date

  @Field({ nullable: true })
  @IsNotEmpty()
  @IsOptional()
  note: string
}
