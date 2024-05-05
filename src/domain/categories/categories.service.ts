import { Injectable } from "@nestjs/common"
import { In } from "typeorm"
import { CategoriesRepository } from "./categories.repository"
import { ICategoriesService } from "./interfaces/categories.interfaces"
import { CreateCategoryDto, UpdateCategoryDto } from "./interfaces/category.dto"
import { Category } from "./interfaces/category.model"
import { CategoryEntity } from "./schemas/category.entity"

@Injectable()
export class CategoriesService implements ICategoriesService {
  constructor(private readonly categoriesRepo: CategoriesRepository) {}

  async create(categoryData: CreateCategoryDto): Promise<CategoryEntity> {
    const categoryEntity = await this.categoriesRepo.create({
      owner_user_id: categoryData.owner_user_id,
      parent_category_id: categoryData.parent_category_id,
      name: categoryData.name,
      color: categoryData.color,
      icon: categoryData.icon,
    })

    const category = await this.categoriesRepo.save(categoryEntity)

    return category
  }

  async update(categoryId: string, categoryData: UpdateCategoryDto): Promise<CategoryEntity> {
    const category = await this.categoriesRepo.save({
      id: categoryId,
      ...categoryData,
    })

    return category
  }

  async exists(categoryId: string): Promise<boolean> {
    return await this.categoriesRepo.exist({ where: { id: categoryId } })
  }

  async listByUserId(userId: string): Promise<CategoryEntity[]> {
    const categories = await this.categoriesRepo.findBy({ owner_user_id: userId })

    return categories
  }

  async listByIds(categoryIds: string[]): Promise<CategoryEntity[]> {
    const categories = await this.categoriesRepo.findBy({ id: In(categoryIds) })

    return categories
  }

  async get(categoryId: string): Promise<CategoryEntity> {
    const category = await this.categoriesRepo.findOneBy({ id: categoryId })

    return category
  }
}
