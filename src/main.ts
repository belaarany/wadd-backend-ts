import { ClassSerializerInterceptor, Logger, ValidationPipe } from "@nestjs/common"
import { NestFactory, Reflector } from "@nestjs/core"
import { AppModule } from "./app.module"
import { ConfigService } from "@nestjs/config"
import { InternalGuard } from "./core/guards/internal.guard"
import { AppConfig } from "./config/app.config"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const config = app.get<ConfigService>(ConfigService)
  const reflector = app.get(Reflector)

  app.setGlobalPrefix("api")

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidUnknownValues: true,
      forbidNonWhitelisted: true,
    }),
  )

  app.useGlobalGuards(new InternalGuard(reflector, config))

  // app.useGlobalInterceptors(new ClassSerializerInterceptor())

  app.enableCors({
    allowedHeaders: "*",
    origin: "*",
    credentials: true,
  })

  await app.listen(config.getOrThrow<AppConfig["port"]>("app.port"))

  Logger.log(`Application environment is "${config.getOrThrow<AppConfig["env"]>("app.env")}"`, "Bootstrap")
  Logger.log(`Application is running on: ${await app.getUrl()}`, "Bootstrap")
}
bootstrap()
