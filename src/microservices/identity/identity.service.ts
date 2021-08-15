import { Inject, Injectable } from "@nestjs/common"
import { ClientProxy } from "@nestjs/microservices"

@Injectable()
export class IdentityMicroservice {
	constructor(@Inject("IDENTITY_SERVICE") private client: ClientProxy) {}

	async register(): Promise<any> {
		// const response = await this.client.send("auth:login", { exampledata: 123 }).toPromise();
		// return response;

		return {
			id: 123,
		}
	}

	async verifyAccessToken(accessToken: string): Promise<boolean> {
		if (!accessToken) {
			return false
		}

		return new Promise((res) => {
			setTimeout(() => res(true), 500)
		})
	}

	async getUsers(userIds: string[]): Promise<any> {
		console.log("[IdentityMicroservice] getUsers", userIds)
		return Promise.resolve(userIds.map((userId) => ({ id: "owner_" + userId, name: "owner_" + userId })))
	}
}
