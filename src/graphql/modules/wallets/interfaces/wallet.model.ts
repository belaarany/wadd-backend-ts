import { Field, ID, ObjectType, registerEnumType } from "@nestjs/graphql"
import { Currency } from "src/interfaces/enums/Currency"
import { WalletType } from "src/interfaces/enums/WalletType"

registerEnumType(Currency, {
  name: "Currency",
})
registerEnumType(WalletType, {
  name: "WalletType",
})

@ObjectType()
export class WalletGQLModel {
  @Field(() => ID)
  readonly id: string

  @Field()
  readonly kind: string

  @Field()
  name: string

  @Field()
  order: number

  @Field()
  owner_user_id: string

  @Field()
  initial_balance: number

  @Field(() => Currency)
  default_currency: Currency

  @Field(() => WalletType)
  type: WalletType

  @Field()
  color_hex: string

  @Field()
  icon_url: string

  @Field()
  is_deleted: boolean

  @Field()
  is_archived: boolean

  @Field({ nullable: true })
  created_at: string

  @Field({ nullable: true })
  updated_at: string | null

  @Field({ nullable: true })
  deleted_at: string | null

  @Field({ nullable: true })
  archived_at: string | null
}

// @ObjectType()
// export class BalanceGQLModel {
//   @Field(() => GraphQLJSON)
//   wallets: any
// }

// @ObjectType()
// export class WalletBalanceGQLModel {
//   @Field()
//   HUF: number
// }
