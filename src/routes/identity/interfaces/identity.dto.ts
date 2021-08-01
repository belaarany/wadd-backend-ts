import { ApiProperty } from "@nestjs/swagger"

export class RegisterRequest {
	@ApiProperty()
	email: string

	@ApiProperty()
	password: string
}

export class RegisterResponse {
	@ApiProperty()
	uuid: string
}
