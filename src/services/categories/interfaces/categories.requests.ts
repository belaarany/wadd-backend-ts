import { Type } from "class-transformer"
import { ArrayUnique, IsArray, IsNotEmpty, IsOptional, ValidateNested } from "class-validator"
import { IsWaddObjectId } from "src/validators/IsWaddObjectIs"

class CreateCategoryRpcRequest_Category {
	@IsNotEmpty()
	@IsWaddObjectId()
	owner_user_id: string

	@IsNotEmpty()
	@IsOptional()
	@IsWaddObjectId()
	parent_category_id: string | null

	@IsNotEmpty()
	name: string
}

export class CreateCategoryRpcRequest {
	@ValidateNested()
	@Type(() => CreateCategoryRpcRequest_Category)
	category: CreateCategoryRpcRequest_Category
}

export class ListUserCategoriesRpcRequest {
	@IsNotEmpty()
	@IsWaddObjectId()
	userId: string
}

export class ListCategoriesRpcRequest {
	@IsNotEmpty()
	@IsArray()
	@ArrayUnique()
	@IsWaddObjectId({ each: true })
	categoryIds: string[]
}

export class CategoryExistsRpcRequest {
	@IsNotEmpty()
	@IsWaddObjectId()
	categoryId: string
}
