import { Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { TypeOrmModule } from "@nestjs/typeorm"
import { GraphQLRootModule } from "./graphql/graphql.module"
import { HttpRootModule } from "./http/http.module"

@Module({
	imports: [
		HttpRootModule,
		GraphQLRootModule,
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => {
				return {
					type: "postgres",
					host: configService.get("POSTGRES_HOST", "localhost"),
					port: configService.get("POSTGRES_PORT", 5432),
					username: configService.get("POSTGRES_USER", "admin"),
					password: configService.get("POSTGRES_PASSWORD", "admin"),
					database: configService.get("POSTGRES_DB", "nestjs"),
					entities: [__dirname + "/**/*.entity.{js,ts}"],
					synchronize: true,
					// logging: true,
				}
			},
		}),
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
