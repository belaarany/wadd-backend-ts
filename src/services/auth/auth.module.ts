import { Module } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { UsersModule } from "src/domain/users/users.module"
import { PassportModule } from "@nestjs/passport"
import { LocalStrategy } from "./local.strategy"
import { JwtModule } from "@nestjs/jwt"
import { JwtStrategy } from "./jwt.strategy"
import { ConfigService } from "@nestjs/config"
import { JwtConfig } from "src/config/jwt.config"

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow("jwt.secret"),
        signOptions: {
          expiresIn: configService.getOrThrow<JwtConfig["expiresIn"]>("jwt.expiresIn"),
        },
        verifyOptions: {},
      }),
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthServiceModule {}
