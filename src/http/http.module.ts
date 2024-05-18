import { Module } from "@nestjs/common"
import { AuthHttpModule } from "./auth/auth.module"
import { InternalHttpModule } from "./internal/internal.module"

@Module({
  imports: [AuthHttpModule, InternalHttpModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class HttpRootModule {}
