import { UseGuards } from "@nestjs/common"
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql"
import { Authorization, AuthUser } from "src/decorators/auth.decorator"
import { AuthGuard } from "src/guards/auth.guard"
import { Category } from "src/interfaces/category.interface"
import { LogMicroservice } from "src/microservices/log/log.service"
import { ExpenseMicroserviceCategoriesService } from "../../../microservices/expense/services/categories.service"
import { CreateCategoryGQLInput } from "./interfaces/categories.inputs"
import { CategoryGQLModel } from "./interfaces/category.model"

@Resolver(() => CategoryGQLModel)
export class CategoriesResolver {
	constructor(
		private expenseMicroserviceCategoriesService: ExpenseMicroserviceCategoriesService,
		private logMicroservice: LogMicroservice,
	) {}

	@UseGuards(AuthGuard)
	@Mutation(() => CategoryGQLModel)
	async createCategory(
		@Authorization() authUser: AuthUser,
		@Args("data") data: CreateCategoryGQLInput,
	): Promise<Category> {
		// TODO: check
		// if ((await this.expenseMicroservice.walletExists(data.parent_category_id)) === false) {
		// 	throw new WalletNotExistsException(data.source_wallet_id)
		// }

		const cateogry = await this.expenseMicroserviceCategoriesService.createCategory({
			owner_user_id: authUser.id,
			parent_category_id: data.parent_category_id,
			name: data.name,
		})

		this.logMicroservice.createLog({
			scope: "user",
			action: "category.create",
			user_id: authUser.id,
			target_id: cateogry.id,
			platform: null,
			data: {
				category: cateogry,
			},
		})

		return cateogry
	}

	@UseGuards(AuthGuard)
	@Query(() => [CategoryGQLModel])
	async categories(@Authorization() authUser: AuthUser): Promise<Category[]> {
		const categories = await this.expenseMicroserviceCategoriesService.listUserCategories(authUser.id)

		return categories
	}
}
