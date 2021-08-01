import { ApiProperty } from "@nestjs/swagger"
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"
import { Currency } from "src/interfaces/types/Currency"
import { WalletType } from "src/interfaces/types/WalletType"
import { IsWaddObjectId } from "src/validators/IsWaddObjectIs"

export class CreateWalletHttpRequest {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	name: string

	@ApiProperty()
	@IsNotEmpty()
	@IsNumber()
	order: number

	@ApiProperty()
	@IsNotEmpty()
	@IsNumber()
	initial_balance: number

	@ApiProperty({ enum: Currency })
	@IsNotEmpty()
	@IsEnum(Currency)
	default_currency: Currency

	@ApiProperty({ enum: WalletType })
	@IsNotEmpty()
	@IsEnum(WalletType)
	type: WalletType

	@ApiProperty()
	@IsNotEmpty()
	@IsOptional()
	@IsWaddObjectId()
	icon_file_id: string | null
}

export class CreateWalletHttpResponseSuccess {
	@ApiProperty()
	name: string

	@ApiProperty()
	order: number

	@ApiProperty()
	owner_user_id: string

	@ApiProperty()
	initial_balance: number

	@ApiProperty({ enum: Currency })
	default_currency: Currency

	@ApiProperty()
	type: WalletType

	@ApiProperty()
	icon_file_id: string

	@ApiProperty()
	is_deleted: boolean

	@ApiProperty()
	is_archived: boolean

	@ApiProperty()
	created_at: Date

	@ApiProperty()
	updated_at: Date

	@ApiProperty()
	deleted_at: Date

	@ApiProperty()
	archived_at: Date
}

export class ListUserWalletsHttpRequest {
	@ApiProperty()
	@IsOptional()
	@IsNumber()
	limit: number
}
