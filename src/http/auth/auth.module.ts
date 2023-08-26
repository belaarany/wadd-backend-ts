import { Module } from "@nestjs/common"
import { IdentityMicroserviceModule } from "src/microservices/identity/identity.module"
import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.service"

@Module({
  imports: [IdentityMicroserviceModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [],
})
export class AuthHttpModule {}
