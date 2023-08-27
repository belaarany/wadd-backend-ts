import { Module } from "@nestjs/common"
import { CategoriesModule } from "src/domain/categories/categories.module"
import { CategoriesService } from "src/domain/categories/categories.service"
import { CategoriesResolver } from "./categories.resolver"

@Module({
  imports: [CategoriesModule],
  providers: [CategoriesResolver],
})
export class CategoriesGQLModule {}
