import { Injectable } from "@nestjs/common"
import { IdentityMicroservice } from "src/microservices/identity/identity.service"

@Injectable()
export class AuthService {
	constructor(private identityMicroservice: IdentityMicroservice) {}

	async register(): Promise<any> {
		const user = await this.identityMicroservice.register()

		return {
			id: user.id,
		}
	}
}
