import { Field, ID, ObjectType, registerEnumType } from "@nestjs/graphql"
import { Currency } from "src/core/interfaces/enums/Currency"
import { WalletType } from "src/core/interfaces/enums/WalletType"

registerEnumType(Currency, {
  name: "Currency",
})
registerEnumType(WalletType, {
  name: "WalletType",
})

@ObjectType()
export class IncomeGQLModel {
  @Field(() => ID)
  readonly id: string

  @Field()
  readonly kind: string

  @Field()
  wallet_id: string

  @Field()
  amount: number

  @Field()
  currency: Currency

  @Field()
  timestamp: Date

  @Field({ nullable: true })
  location: string

  @Field(() => [String], { nullable: true })
  related_expense_ids: string[]

  @Field({ nullable: true })
  note: string

  @Field()
  category_id: string

  @Field(() => [String], { nullable: true })
  tags: string[]

  @Field({ nullable: true })
  group_id: string | null

  @Field(() => [String], { nullable: true })
  attachment_file_ids: string[]

  @Field()
  is_deleted: boolean

  @Field()
  is_cancelled: boolean

  @Field({ nullable: true })
  created_at: Date | null

  @Field({ nullable: true })
  updated_at: Date | null

  @Field({ nullable: true })
  deleted_at: Date | null

  @Field({ nullable: true })
  cancelled_at: Date | null
}
