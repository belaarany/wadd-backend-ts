import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import { AuthService } from "src/services/auth/auth.service"
import { JwtAuthGuard } from "src/services/auth/jwt-auth.guard"
import { LocalAuthGuard } from "src/services/auth/local-auth.guard"

type LoginDto = {
  email: string
  password: string
}

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  @UseGuards(LocalAuthGuard)
  async login(@Body() data: LoginDto): Promise<any> {
    const user = await this.authService.login({
      email: data.email,
      password: data.password,
    })

    const jwt = await this.authService.getJwt(user)

    return jwt
  }

  @UseGuards(JwtAuthGuard)
  @Get("profile")
  getProfile(@Request() req) {
    return req.user
  }
}
