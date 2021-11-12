import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { Category } from "./interfaces/category.model"
import { CreateCategoryDto } from "./interfaces/category.dto"
import { ICategoriesRepository, CategoryRepositoryFilter } from "./interfaces/categories.interfaces"
import { CategoryEntity } from "./schemas/category.entity"
import { CategoryFactory } from "./schemas/category.factory"
import { CategoryMapper } from "./schemas/category.mapper"

export class CategoriesRepository implements ICategoriesRepository {
	constructor(
		@InjectRepository(CategoryEntity)
		private readonly db: Repository<CategoryEntity>,
	) {}

	async create(categoryData: CreateCategoryDto): Promise<Category> {
		const category = CategoryFactory.make({
			owner_user_id: categoryData.owner_user_id,
			parent_category_id: categoryData.parent_category_id,
			name: categoryData.name,

			created_at: new Date(),
		})
		const insertedCategory = await this.db.save(category)

		return CategoryMapper.fromEntity(insertedCategory)
	}

	async list(filter?: CategoryRepositoryFilter): Promise<Category[]> {
		const findFilterWhere = {}

		if ("ids" in filter) {
			findFilterWhere["$or"] = filter.ids.map((id) => ({ id: id }))
		}

		if ("owner_user_id" in filter) {
			findFilterWhere["owner_user_id"] = filter.owner_user_id
		}

		const categories = await this.db.find({ where: findFilterWhere })

		return categories.map(CategoryMapper.fromEntity)
	}
}
