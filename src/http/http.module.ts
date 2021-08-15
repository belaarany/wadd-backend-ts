import { Module } from "@nestjs/common"
import { AuthHttpModule } from "./auth/auth.module"

@Module({
	imports: [AuthHttpModule],
	controllers: [],
	providers: [],
	exports: [],
})
export class HttpRootModule {}
