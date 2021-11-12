import { Injectable } from "@nestjs/common"
import { Category } from "./interfaces/category.model"
import { CreateCategoryDto } from "./interfaces/category.dto"
import { ICategoriesService } from "./interfaces/categories.interfaces"
import { CategoriesRepository } from "./categories.repository"
import { MultipleEntitiesFoundException } from "src/errors/entity.errors"

@Injectable()
export class CategoriesService implements ICategoriesService {
	constructor(private readonly categoriesRepo: CategoriesRepository) {}

	async create(transferData: CreateCategoryDto): Promise<Category> {
		const category = await this.categoriesRepo.create(transferData)
		return category
	}

	async exists(categoryId: string): Promise<boolean> {
		const categories = await this.categoriesRepo.list({ ids: [categoryId] })

		if (categories.length > 1) {
			throw new MultipleEntitiesFoundException()
		}

		if (categories.length === 0) {
			return false
		}

		return true
	}

	async listByUserId(userId: string): Promise<Category[]> {
		const categories = await this.categoriesRepo.list({ owner_user_id: userId })
		return categories
	}

	async listByIds(categoryIds: string[]): Promise<Category[]> {
		const categories = await this.categoriesRepo.list({ ids: categoryIds })
		return categories
	}
}
