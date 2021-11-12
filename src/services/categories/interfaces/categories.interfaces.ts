import { Category } from "./category.model"
import { CreateCategoryDto } from "./category.dto"

export interface ICategoriesService {
	create(data: CreateCategoryDto): Promise<Category>
	exists(categoryId: string): Promise<boolean>
	listByUserId(userId: string): Promise<Category[]>
	listByIds(categoryIds: string[]): Promise<Category[]>
}

export interface ICategoriesRepository {
	create(transferData: Partial<Category>): Promise<Category>
	list(filter?: CategoryRepositoryFilter): Promise<Category[]>
}

export type CategoryRepositoryFilter = {
	ids?: string[]
	owner_user_id?: string
}
