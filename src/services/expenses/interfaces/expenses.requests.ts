import { Type } from "class-transformer"
import { ArrayUnique, IsArray, IsDateString, IsEnum, IsNotEmpty, IsOptional, ValidateNested } from "class-validator"
import { Currency } from "src/interfaces/enums/Currency"
import { IsWaddObjectId } from "src/validators/IsWaddObjectIs"

class CreateExpenseRpcRequest_Expense {
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
	related_income_ids: string[]

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

export class CreateExpenseRpcRequest {
	@ValidateNested()
	@Type(() => CreateExpenseRpcRequest_Expense)
	expense: CreateExpenseRpcRequest_Expense
}

export class ListWalletExpensesRpcRequest {
	@IsNotEmpty()
	@IsArray()
	@ArrayUnique()
	@IsWaddObjectId({ each: true })
	walletIds: string[]
}

export class ListExpensesRpcRequest {
	@IsNotEmpty()
	@IsArray()
	@ArrayUnique()
	@IsWaddObjectId({ each: true })
	expenseIds: string[]
}

export class ExpenseExistsRpcRequest {
	@IsNotEmpty()
	@IsWaddObjectId()
	expenseId: string
}

export class GetSummaryRpcRequest {
	@IsNotEmpty()
	@IsWaddObjectId()
	walletId: string
}
