import { Injectable } from "@nestjs/common"
import { CategoriesRepository } from "./categories.repository"
import { ICategoriesService } from "./interfaces/categories.interfaces"
import { CreateCategoryDto } from "./interfaces/category.dto"
import { Category } from "./interfaces/category.model"
import { CategoryFactory } from "./schemas/category.factory"
import { CategoryMapper } from "./schemas/category.mapper"
import { In } from "typeorm"

@Injectable()
export class CategoriesService implements ICategoriesService {
  constructor(private readonly categoriesRepo: CategoriesRepository) {}

  async create(categoryData: CreateCategoryDto): Promise<Category> {
    const category = CategoryFactory.make({
      owner_user_id: categoryData.owner_user_id,
      parent_category_id: categoryData.parent_category_id,
      name: categoryData.name,
    })

    const insertedCategory = await this.categoriesRepo.create(category)

    return CategoryMapper.fromEntity(insertedCategory)
  }

  async exists(categoryId: string): Promise<boolean> {
    return await this.categoriesRepo.exist({ where: { id: categoryId } })
  }

  async listByUserId(userId: string): Promise<Category[]> {
    const categories = await this.categoriesRepo.findBy({ owner_user_id: userId })

    return categories.map(CategoryMapper.fromEntity)
  }

  async listByIds(categoryIds: string[]): Promise<Category[]> {
    const categories = await this.categoriesRepo.findBy({ id: In(categoryIds) })

    return categories.map(CategoryMapper.fromEntity)
  }
}
