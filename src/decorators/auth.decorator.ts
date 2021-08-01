import { createParamDecorator, ExecutionContext } from "@nestjs/common"

export type AuthUser = {
	id: string
}

export const Authorization = createParamDecorator((data: unknown, ctx: ExecutionContext): AuthUser => {
	const request = ctx.switchToHttp().getRequest()
	return request.authUser
})
