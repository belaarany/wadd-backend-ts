import { Category } from "../interfaces/category.model"
import { CategoryEntity } from "./category.entity"

export class CategoryMapper {
	static fromEntity(document: CategoryEntity): Category {
		return {
			id: document.id,
			kind: "category",
			owner_user_id: document.owner_user_id,
			parent_category_id: document.parent_category_id,
			name: document.name,
			is_deleted: document.is_deleted,
			created_at: document.created_at,
			updated_at: document.updated_at,
			deleted_at: document.deleted_at,
		}
	}
}
