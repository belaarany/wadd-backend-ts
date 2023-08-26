import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common"
import { GqlExecutionContext } from "@nestjs/graphql"
import { IdentityMicroservice } from "src/microservices/identity/identity.service"

@Injectable()
export class AuthGuard implements CanActivate {
  constructor() {}

  canActivate(context: ExecutionContext): Promise<boolean> {
    // const request = context.switchToHttp().getRequest()
    const gqlCtx = GqlExecutionContext.create(context)
    const request = gqlCtx.getContext().req

    request.authUser = {
      id: request?.headers?.authorization?.split(" ")?.[1] || "unknown",
    }

    return Promise.resolve(true)

    // return this.validateRequest(request)
  }

  async validateRequest(): Promise<boolean> {
    return Promise.resolve(true)
    // const isAccessTokenValied = await this.identityMicroservice.verifyAccessToken("test")
    // console.log({isAccessTokenValied})

    // return Promise.resolve(isAccessTokenValied)
  }
}
