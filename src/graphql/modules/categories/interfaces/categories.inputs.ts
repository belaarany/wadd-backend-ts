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

  @Field()
  @IsNotEmpty()
  color: string

  @Field()
  @IsNotEmpty()
  icon: string
}

@InputType()
export class UpdateCategoryGQLInput {
  @Field({ nullable: true })
  @IsNotEmpty()
  @IsOptional()
  @IsWaddObjectId()
  parent_category_id: string | null

  @Field()
  @IsNotEmpty()
  name: string

  @Field()
  @IsNotEmpty()
  color: string

  @Field()
  @IsNotEmpty()
  icon: string
}
