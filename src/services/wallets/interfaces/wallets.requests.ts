import { Type } from "class-transformer"
import {
	ArrayUnique,
	IsArray,
	IsEnum,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	ValidateNested,
} from "class-validator"
import { Currency } from "src/interfaces/enums/Currency"
import { IsWaddObjectId } from "src/validators/IsWaddObjectIs"
import { WalletType } from "./wallet.model"

class CreateWalletRpcRequest_Wallet {
	@IsNotEmpty()
	@IsString()
	name: string

	@IsNotEmpty()
	@IsNumber()
	order: number

	@IsNotEmpty()
	@IsString()
	owner_user_id: string

	@IsNotEmpty()
	@IsNumber()
	initial_balance: number

	@IsNotEmpty()
	@IsEnum(Currency)
	default_currency: Currency

	@IsNotEmpty()
	@IsEnum(WalletType)
	type: WalletType

	@IsNotEmpty()
	@IsOptional()
	@IsString()
	icon_file_id: string | null
}

export class CreateWalletRpcRequest {
	@ValidateNested()
	@Type(() => CreateWalletRpcRequest_Wallet)
	wallet: CreateWalletRpcRequest_Wallet
}

class UpdateWalletRpcRequest_Wallet {
	@IsNotEmpty()
	@IsString()
	name: string

	@IsNotEmpty()
	@IsNumber()
	order: number

	@IsNotEmpty()
	@IsNumber()
	initial_balance: number

	@IsNotEmpty()
	@IsEnum(Currency)
	default_currency: Currency

	@IsNotEmpty()
	@IsEnum(WalletType)
	type: WalletType

	@IsNotEmpty()
	@IsOptional()
	@IsWaddObjectId()
	icon_file_id: string | null
}

export class UpdateWalletRpcRequest {
	@IsNotEmpty()
	@IsWaddObjectId()
	walletId: string

	@ValidateNested()
	@Type(() => UpdateWalletRpcRequest_Wallet)
	wallet: UpdateWalletRpcRequest_Wallet
}

export class ListUserWalletsRpcRequest {
	@IsNotEmpty()
	@IsWaddObjectId()
	userId: string
}

export class ListWalletsRpcRequest {
	@IsNotEmpty()
	@IsArray()
	@ArrayUnique()
	@IsWaddObjectId({ each: true })
	walletIds: string[]
}

export class WalletExistsRpcRequest {
	@IsNotEmpty()
	@IsWaddObjectId()
	walletId: string
}
