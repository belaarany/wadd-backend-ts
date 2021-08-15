import { Body, Controller, Post } from "@nestjs/common"
import { ApiCreatedResponse, ApiTags } from "@nestjs/swagger"
import { AuthService } from "./auth.service"
import { RegisterRequest, RegisterResponse } from "./interfaces/auth.dto"

@Controller("auth")
export class AuthController {
	constructor(private identityService: AuthService) {}

	@Post("register")
	async register(@Body() registerDto: any): Promise<any> {
		console.log(registerDto)
		const user = await this.identityService.register()

		return {
			uuid: user.id,
		}
	}
}
