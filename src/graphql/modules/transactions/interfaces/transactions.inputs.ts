import { Field, InputType, createUnionType } from "@nestjs/graphql"
import { Type } from "class-transformer"
import {
  ArrayUnique,
  IsArray,
  IsEnum,
  IsHexColor,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from "class-validator"
import { Currency } from "src/core/interfaces/enums/Currency"
import { WalletType } from "src/core/interfaces/enums/WalletType"
import { IsWaddObjectId } from "src/core/validators/IsWaddObjectIs"
import { IncomeGQLModel } from "../../incomes/interfaces/income.model"
import { ExpenseGQLModel } from "../../expenses/interfaces/expense.model"

@InputType()
export class TransactionsFilterGQLInput {
  @Field(() => [String])
  @IsArray()
  @ArrayUnique()
  // @IsWaddObjectId({ each: true })
  @IsOptional()
  wallet_ids?: string[]
}
