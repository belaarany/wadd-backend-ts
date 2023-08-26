import { Field, ID, ObjectType, registerEnumType } from "@nestjs/graphql"
import { Currency } from "src/interfaces/enums/Currency"
import { WalletType } from "src/interfaces/enums/WalletType"

@ObjectType()
export class TransactionGQLModel {
  @Field()
  readonly kind: string
}
