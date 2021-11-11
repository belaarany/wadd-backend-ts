import { Field, ID, ObjectType, registerEnumType } from "@nestjs/graphql"
import { Currency } from "src/interfaces/types/Currency"
import { WalletType } from "src/interfaces/types/WalletType"

@ObjectType()
export class TransactionGQLModel {
	@Field()
	readonly kind: string
}
