import { Injectable } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { Strategy } from "passport-local"
import { InvalidCredentialsException } from "src/core/exceptions/invalid-credentials.exception"
import { UserEntity } from "src/domain/users/schemas/user.entity"
import { AuthService } from "./auth.service"

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: "email",
      passwordField: "password",
    })
  }

  async validate(email: string, password: string): Promise<UserEntity> {
    const user = await this.authService.login({
      email,
      password,
    })

    if (!user) {
      throw new InvalidCredentialsException()
    }

    return user
  }
}
