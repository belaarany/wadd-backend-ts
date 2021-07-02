import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { IdentityMicroservice } from 'src/microservices/identity/identity.service';
import { CommonResponse, CommonResponseFactory } from 'src/shared/CommonResponse.service';
import { RegisterRequest, RegisterResponse } from './identity.dto';
import { IdentityService } from './identity.service';

@ApiTags('Identity')
@Controller("identity")
export class IdentityController {
	constructor(
		private res: CommonResponseFactory,
		private identityService: IdentityService,
	) { }

	@Post("register")
	@ApiCreatedResponse({ type: RegisterResponse })
	async register(@Body() registerDto: RegisterRequest): Promise<CommonResponse<RegisterResponse>> {
		let user = await this.identityService.register()

		return this.res.create<RegisterResponse>({
			uuid: user.id,
		});
	}
}
