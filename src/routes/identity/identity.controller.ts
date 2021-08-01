import { Body, Controller, Post } from "@nestjs/common"
import { ApiCreatedResponse, ApiTags } from "@nestjs/swagger"
import { IdentityService } from "./identity.service"
import { RegisterRequest, RegisterResponse } from "./interfaces/identity.dto"

@ApiTags("Identity")
@Controller("identity")
export class IdentityController {
	constructor(private identityService: IdentityService) {}

	@Post("register")
	@ApiCreatedResponse({ type: RegisterResponse })
	async register(@Body() registerDto: RegisterRequest): Promise<RegisterResponse> {
		console.log(registerDto)
		const user = await this.identityService.register()

		return {
			uuid: user.id,
		}
	}
}
