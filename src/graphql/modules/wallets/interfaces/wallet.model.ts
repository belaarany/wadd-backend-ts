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
  created_at: Date

  @Field({ nullable: true })
  updated_at: Date | null

  @Field({ nullable: true })
  deleted_at: Date | null

  @Field({ nullable: true })
  archived_at: Date | null
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

@ObjectType()
export class WalletBalancesViewGQLModel {
  @Field(() => ID)
  wallet_id: number

  @Field()
  initial_balance: number

  @Field()
  total_incomes: number

  @Field()
  total_expenses: number

  @Field()
  total_incoming_transfers: number

  @Field()
  total_outgoing_transfers: number

  @Field()
  balance: number
}
