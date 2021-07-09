import { ApiProperty } from "@nestjs/swagger"
import { IsDefined, IsNotEmpty, IsNumber, IsString, IsUUID, Length } from "class-validator"

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
	@IsUUID()
	owner_id: string

	@ApiProperty()
	@IsNotEmpty()
	@IsNumber()
	initial_balance: number
}

export class CreateWalletHttpResponseSuccess {
	@ApiProperty()
	name: string;

	@ApiProperty()
	order: number;

	@ApiProperty()
	owner_id: string;

	@ApiProperty()
	initial_balance: number;

	@ApiProperty()
	is_deleted: boolean;

	@ApiProperty()
	is_archived: boolean;

	@ApiProperty()
	created_at: string;

	@ApiProperty()
	updated_at: string;

	@ApiProperty()
	deleted_at: string;

	@ApiProperty()
	archived_at: string;
}

export type CreateWalletDTO = {
	name: string,
	order: number,
	owner_id: string,
	initial_balance: number,
}
