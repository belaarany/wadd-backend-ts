import { Injectable } from "@nestjs/common"
import * as DataLoader from "dataloader"
import { INestDataLoader, NestDataLoader } from "src/core/utils/data-loader"
import { CategoriesService } from "src/services/categories/categories.service"
import { Category } from "src/services/categories/interfaces/category.model"

@Injectable()
export class CategoriesLoader extends NestDataLoader<Category> implements INestDataLoader<Category> {
  constructor(private categoriesService: CategoriesService) {
    super()

    this.dataLoader = this.generateDataLoader()
  }

  generateDataLoader(): DataLoader<string, Category> {
    return new DataLoader<string, Category>((categoryIds) => this.categoriesService.listByIds(categoryIds as string[]))
  }
}
