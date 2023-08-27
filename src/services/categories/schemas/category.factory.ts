import * as Lodash from "lodash"
import { generateId } from "../../../utils/GenerateId"
import { IdPrefix } from "../../../interfaces/enums/IdPrefix"
import { CategoryEntity } from "./category.entity"

export class CategoryFactory {
  static make(categoryPartialData: Partial<CategoryEntity>): CategoryEntity {
    const category = new CategoryEntity()

    category.id = generateId(IdPrefix.CATEGORY)
    category.owner_user_id = null
    category.parent_category_id = null
    category.name = ""
    category.created_at = null
    category.updated_at = null
    category.deleted_at = null

    Lodash.forEach(categoryPartialData, (value, key) => {
      category[key] = value
    })

    return category
  }
}
