import { Injectable } from "@nestjs/common"
import * as DataLoader from "dataloader"
import { INestDataLoader, NestDataLoader } from "src/core/utils/data-loader"
import { CategoriesService } from "src/domain/categories/categories.service"
import { Category } from "src/domain/categories/interfaces/category.model"
import { preserveOrder } from "src/utils/preserve-order"

@Injectable()
export class CategoriesLoader extends NestDataLoader<Category> implements INestDataLoader<Category> {
  constructor(private categoriesService: CategoriesService) {
    super()

    this.dataLoader = this.generateDataLoader()
  }

  generateDataLoader(): DataLoader<string, Category> {
    return new DataLoader<string, Category>(async (categoryIds) =>
      preserveOrder(categoryIds, await this.categoriesService.listByIds(categoryIds as string[])),
    )
  }
}
