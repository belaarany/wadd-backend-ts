import { createParamDecorator, ExecutionContext } from "@nestjs/common"
import { GqlExecutionContext } from "@nestjs/graphql"

export type AuthUser = {
  id: string
}

export const Authorization = createParamDecorator((data: unknown, ctx: ExecutionContext): AuthUser => {
  // const request = ctx.switchToHttp().getRequest()
  const gqlCtx = GqlExecutionContext.create(ctx)
  const request = gqlCtx.getContext().req

  return request.authUser
})
