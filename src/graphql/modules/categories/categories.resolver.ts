import { UseGuards } from "@nestjs/common"
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql"
import { Authorization, AuthUser } from "src/core/decorators/auth.decorator"
import { CategoryNotExistsException } from "src/core/exceptions/categoryNotExists.exception"
import { AuthGuard } from "src/core/guards/auth.guard"
import { CategoriesService } from "src/domain/categories/categories.service"
import { Category } from "src/domain/categories/interfaces/category.model"
import { CreateCategoryGQLInput, UpdateCategoryGQLInput } from "./interfaces/categories.inputs"
import { CategoryGQLModel } from "./interfaces/category.model"

@Resolver(() => CategoryGQLModel)
export class CategoriesResolver {
  constructor(private categoriesService: CategoriesService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => CategoryGQLModel, { name: "create_category" })
  async createCategory(
    @Authorization() authUser: AuthUser,
    @Args("data") data: CreateCategoryGQLInput,
  ): Promise<Category> {
    if (data.parent_category_id !== null && (await this.categoriesService.exists(data.parent_category_id)) === false) {
      throw new CategoryNotExistsException(data.parent_category_id)
    }

    const cateogry = await this.categoriesService.create({
      owner_user_id: authUser.id,
      parent_category_id: data.parent_category_id,
      name: data.name,
      color: data.color,
      icon: data.icon,
    })

    return cateogry
  }

  @UseGuards(AuthGuard)
  @Mutation(() => CategoryGQLModel, { name: "update_category" })
  async updateCategory(
    @Authorization() authUser: AuthUser,
    @Args("id") id: string,
    @Args("data") data: UpdateCategoryGQLInput,
  ): Promise<Category> {
    const wallet = await this.categoriesService.update(id, {
      name: data.name,
      color: data.color,
      icon: data.icon,
      parent_category_id: data.parent_category_id,
    })

    return wallet
  }

  @UseGuards(AuthGuard)
  @Mutation(() => CategoryGQLModel)
  async deleteCategory(@Authorization() authUser: AuthUser, @Args("categoryId") categoryId: string): Promise<Category> {
    const cateogry = await this.categoriesService.listByIds([categoryId])

    // this.logMicroservice.createLog({
    // 	scope: "user",
    // 	action: "category.create",
    // 	user_id: authUser.id,
    // 	target_id: cateogry.id,
    // 	platform: null,
    // 	data: {
    // 		category: cateogry,c
    // 	},
    // })

    return cateogry[0]
  }

  @UseGuards(AuthGuard)
  @Query(() => [CategoryGQLModel])
  async categories(@Authorization() authUser: AuthUser): Promise<Category[]> {
    const categories = await this.categoriesService.listByUserId(authUser.id)

    return categories
  }

  @UseGuards(AuthGuard)
  @Query(() => CategoryGQLModel)
  async category(@Authorization() authUser: AuthUser, @Args("id") id: string): Promise<Category> {
    const category = await this.categoriesService.get(id)

    return category
  }
}
