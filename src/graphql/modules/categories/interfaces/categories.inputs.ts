import { Field, InputType } from "@nestjs/graphql"
import { IsNotEmpty, IsOptional } from "class-validator"
import { IsWaddObjectId } from "src/core/validators/IsWaddObjectIs"

@InputType()
export class CreateCategoryGQLInput {
  @Field({ nullable: true })
  @IsNotEmpty()
  @IsOptional()
  @IsWaddObjectId()
  parent_category_id: string | null

  @Field()
  @IsNotEmpty()
  name: string
}

@InputType()
export class UpdateCategoryGQLInput {
  @Field()
  @IsNotEmpty()
  @IsWaddObjectId()
  id: string

  @Field({ nullable: true })
  @IsNotEmpty()
  @IsOptional()
  @IsWaddObjectId()
  parent_category_id: string | null

  @Field()
  @IsNotEmpty()
  name: string
}
