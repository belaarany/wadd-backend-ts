import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { CategoryEntity } from "./schemas/category.entity"
import { CategoriesRepository } from "./categories.repository"
import { CategoriesService } from "./categories.service"

@Module({
	imports: [TypeOrmModule.forFeature([CategoryEntity])],
	controllers: [],
	providers: [CategoriesService, CategoriesRepository],
	exports: [CategoriesService]
})
export class CategoriesModule {}
