import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { Reflector } from "@nestjs/core"
import { AuthGuard as PassportAuthGaurd } from "@nestjs/passport"
import { AppConfig } from "src/config/app.config"

@Injectable()
export class InternalGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly configService: ConfigService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const isInternal = this.reflector.get<boolean>("isInternal", context.getHandler())
    const isLocalEnv = this.configService.getOrThrow<AppConfig["env"]>("app.env") === "local"

    if (isInternal && !isLocalEnv) {
      return false
    }

    return true
  }
}
