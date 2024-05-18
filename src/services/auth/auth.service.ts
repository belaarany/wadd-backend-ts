import { HttpException, Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { InvalidCredentialsException } from "src/core/exceptions/invalid-credentials.exception"
import { UserEntity } from "src/domain/users/schemas/user.entity"
import { UsersService } from "src/domain/users/users.service"
import { JWT, JWTContent } from "./types"
import * as bcrypt from "bcrypt"

type LoginParams = {
  email: string
  password: string
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(data: LoginParams): Promise<UserEntity> {
    const user = await this.usersService.findByEmail(data.email)

    if (!user) {
      throw new InvalidCredentialsException()
    }

    const isValidPassword = await this.comparePassword(data.password, user.password)

    if (!isValidPassword) {
      throw new InvalidCredentialsException()
    }

    return user
  }

  getJwt(user: UserEntity): JWT {
    const payload: JWTContent = { email: user.email, sub: user.id }

    return {
      access_token: this.jwtService.sign(payload),
    }
  }

  comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword)
  }
}
