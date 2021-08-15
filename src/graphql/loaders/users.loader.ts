import * as DataLoader from "dataloader"
import { Injectable } from "@nestjs/common"
import { NestDataLoader } from "nestjs-dataloader"
import { IdentityMicroservice } from "src/microservices/identity/identity.service"

@Injectable()
export class UsersLoader implements NestDataLoader<string, any> {
	constructor(private identityMicroservice: IdentityMicroservice) {}

	generateDataLoader(): DataLoader<string, any> {
		return new DataLoader<string, any>((keys) => this.identityMicroservice.getUsers(keys as string[]))
	}
}
