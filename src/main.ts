import { ClassSerializerInterceptor, Logger, ValidationPipe } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { ConfigService } from "@nestjs/config"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const config = app.get<ConfigService>(ConfigService)

  app.setGlobalPrefix("api")

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidUnknownValues: true,
      forbidNonWhitelisted: true,
    }),
  )

  // app.useGlobalInterceptors(new ClassSerializerInterceptor())

  app.enableCors({
    allowedHeaders: "*",
    origin: "*",
    credentials: true,
  })

  await app.listen(config.getOrThrow("app.port"))

  Logger.log(`Application is running on: ${await app.getUrl()}`, "Bootstrap")
}
bootstrap()
