import { ExtractJwt, Strategy } from "passport-jwt"
import { PassportStrategy } from "@nestjs/passport"
import { Injectable } from "@nestjs/common"
import { JWTContent } from "./types"
import { UsersService } from "src/domain/users/users.service"
import { UserEntity } from "src/domain/users/schemas/user.entity"
import { ConfigService } from "@nestjs/config"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService,
    readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow("jwt.secret"),
    })
  }

  async validate(payload: JWTContent): Promise<UserEntity> {
    const user = await this.usersService.findById(payload.sub)

    return user
  }
}
