import { ClassSerializerInterceptor, Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { TypeOrmModule } from "@nestjs/typeorm"
import { GraphQLRootModule } from "./graphql/graphql.module"
import { HttpRootModule } from "./http/http.module"
import { APP_INTERCEPTOR } from "@nestjs/core"
import databaseConfig, { DatabaseConfig } from "./config/database.config"
import jwtConfig from "./config/jwt.config"
import appConfig from "./config/app.config"

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [".env", ".env.local"],
      load: [appConfig, databaseConfig, jwtConfig],
      isGlobal: true,
    }),
    // ServicesRootModule,
    HttpRootModule,
    GraphQLRootModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: "postgres",
          host: configService.getOrThrow<DatabaseConfig["host"]>("database.host"),
          port: configService.getOrThrow<DatabaseConfig["port"]>("database.port"),
          username: configService.getOrThrow<DatabaseConfig["username"]>("database.username"),
          password: configService.getOrThrow<DatabaseConfig["password"]>("database.password"),
          database: configService.getOrThrow<DatabaseConfig["database"]>("database.database"),
          entities: [__dirname + "/**/*.entity.{js,ts}"],
          synchronize: true,
          // logging: true,
        }
      },
    }),
  ],
  controllers: [],
  providers: [
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: ClassSerializerInterceptor,
    // },
  ],
  exports: [],
})
export class AppModule {}
