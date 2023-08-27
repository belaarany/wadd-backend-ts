import { Type } from "class-transformer"
import { ArrayUnique, IsArray, IsDateString, IsEnum, IsNotEmpty, IsOptional, ValidateNested } from "class-validator"
import { IsWaddObjectId } from "src/core/validators/IsWaddObjectIs"
import { Currency } from "../../../core/interfaces/enums/Currency"

class CreateIncomeRpcRequest_Income {
  @IsNotEmpty()
  @IsWaddObjectId()
  wallet_id: string

  @IsNotEmpty()
  amount: number

  @IsNotEmpty()
  @IsEnum(Currency)
  currency: Currency

  @IsNotEmpty()
  @IsDateString()
  timestamp: Date

  @IsNotEmpty()
  location: string

  @IsNotEmpty()
  @IsArray()
  @ArrayUnique()
  @IsWaddObjectId({ each: true })
  related_expense_ids: string[]

  @IsNotEmpty()
  note: string

  @IsNotEmpty()
  category_id: string

  @IsNotEmpty()
  @IsArray()
  @ArrayUnique()
  tags: string[]

  @IsNotEmpty()
  @IsOptional()
  group_id: string | null

  @IsNotEmpty()
  @IsArray()
  @ArrayUnique()
  @IsWaddObjectId({ each: true })
  attachment_file_ids: string[]
}

export class CreateIncomeRpcRequest {
  @ValidateNested()
  @Type(() => CreateIncomeRpcRequest_Income)
  income: CreateIncomeRpcRequest_Income
}

export class ListWalletIncomesRpcRequest {
  @IsNotEmpty()
  @IsArray()
  @ArrayUnique()
  @IsWaddObjectId({ each: true })
  walletIds: string[]
}

export class ListIncomesRpcRequest {
  @IsNotEmpty()
  @IsArray()
  @ArrayUnique()
  @IsWaddObjectId({ each: true })
  expenseIds: string[]
}

export class IncomeExistsRpcRequest {
  @IsNotEmpty()
  @IsWaddObjectId()
  incomeId: string
}

export class GetSummaryRpcRequest {
  @IsNotEmpty()
  @IsWaddObjectId()
  walletId: string
}
