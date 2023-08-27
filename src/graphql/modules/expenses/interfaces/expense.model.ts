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
export class ExpenseGQLModel {
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
  timestamp: string

  @Field()
  location: string

  @Field(() => [String])
  related_income_ids: string[]

  @Field()
  note: string

  @Field()
  category_id: string

  @Field(() => [String])
  tags: string[]

  @Field({ nullable: true })
  group_id: string | null

  @Field(() => [String])
  attachment_file_ids: string[]

  @Field()
  is_deleted: boolean

  @Field()
  is_cancelled: boolean

  @Field({ nullable: true })
  created_at: string | null

  @Field({ nullable: true })
  updated_at: string | null

  @Field({ nullable: true })
  deleted_at: string | null

  @Field({ nullable: true })
  cancelled_at: string | null
}
