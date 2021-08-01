import { Module } from "@nestjs/common"
import { IdentityMicroserviceModule } from "src/microservices/identity/identity.module"
import { IdentityController } from "./identity.controller"
import { IdentityService } from "./identity.service"

@Module({
	imports: [IdentityMicroserviceModule],
	controllers: [IdentityController],
	providers: [IdentityService],
	exports: [],
})
export class IdentityModule {}
