import { Category } from "./category.model"
import { CreateCategoryDto, UpdateCategoryDto } from "./category.dto"

export interface ICategoriesService {
  create(data: CreateCategoryDto): Promise<Category>
  update(id: string, data: UpdateCategoryDto): Promise<Category>
  exists(categoryId: string): Promise<boolean>
  listByUserId(userId: string): Promise<Category[]>
  listByIds(categoryIds: string[]): Promise<Category[]>
  get(categoryId: string): Promise<Category>
}

export interface ICategoriesRepository {}
