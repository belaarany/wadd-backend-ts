import { Module } from "@nestjs/common"
import { ClientsModule, Transport } from "@nestjs/microservices"
import { IdentityMicroservice } from "./identity.service"

@Module({
	imports: [
		ClientsModule.register([
			{
				name: "IDENTITY_SERVICE",
				transport: Transport.REDIS,
				options: {
					url: "redis://localhost:6379",
				},
			},
		]),
	],
	providers: [IdentityMicroservice],
	exports: [IdentityMicroservice],
})
export class IdentityMicroserviceModule {}
