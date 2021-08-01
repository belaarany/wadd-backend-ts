import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common"
import { IdentityMicroservice } from "src/microservices/identity/identity.service"

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private identityMicroservice: IdentityMicroservice) {}

	canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest()

		request.authUser = {
			id: request.headers?.authorization?.split(" ")?.[1] || "unknown",
		}

		return Promise.resolve(true)

		// return this.validateRequest(request)
	}

	async validateRequest(): Promise<boolean> {
		const isAccessTokenValied = await this.identityMicroservice.verifyAccessToken("test")
		// console.log({isAccessTokenValied})

		return Promise.resolve(isAccessTokenValied)
	}
}
