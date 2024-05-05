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
export class TransferGQLModel {
  @Field(() => ID)
  readonly id: string

  @Field()
  readonly kind: string

  @Field()
  source_wallet_id: string

  @Field()
  target_wallet_id: string

  @Field()
  amount: number

  @Field()
  timestamp: Date

  @Field({ nullable: true })
  note: string

  @Field()
  is_deleted: boolean

  @Field({ nullable: true })
  created_at: Date | null

  @Field({ nullable: true })
  updated_at: Date | null

  @Field({ nullable: true })
  deleted_at: Date | null
}
