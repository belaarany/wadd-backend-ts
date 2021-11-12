import * as Faker from "faker"
import { generateId } from "../../../utils/GenerateId"
import { IdPrefix } from "../../../interfaces/enums/IdPrefix"
import { CreateCategoryDto } from "../interfaces/category.dto"
import { Category } from "../interfaces/category.model"
import { CategoryFactory } from "../schemas/category.factory"
import { CategoryMapper } from "../schemas/category.mapper"

export class CategoryMock {
	static makeCreateRequest(): CreateCategoryDto {
		return {
			owner_user_id: generateId(IdPrefix.USER),
			parent_category_id: generateId(IdPrefix.CATEGORY),
			name: Faker.lorem.word(),
		}
	}

	static makeMockObject(): Category {
		return CategoryMapper.fromEntity(
			CategoryFactory.make({
				...CategoryMock.makeCreateRequest(),
			}),
		)
	}

	static getModelKeys(): string[] {
		return [
			"id",
			"kind",
			"owner_user_id",
			"parent_category_id",
			"name",
			"is_deleted",
			"created_at",
			"updated_at",
			"deleted_at",
		]
	}
}
