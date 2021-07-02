import { Inject, Injectable } from '@nestjs/common';
import { IdentityMicroservice } from 'src/microservices/identity/identity.service';
import { CommonResponse } from 'src/shared/CommonResponse.service';

@Injectable()
export class IdentityService {
	constructor(
		private identityMicroservice: IdentityMicroservice
	) { }

	async register(): Promise<any> {
		let user = await this.identityMicroservice.register()

		return {
			id: user.id,
		}
	}
}
