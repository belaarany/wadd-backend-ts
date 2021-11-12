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
export class TransferGQLModel {
	@Field(() => ID)
	readonly id: string

	@Field()
	readonly kind: string

	@Field()
	source_wallet_id: string

	@Field()
	source_amount: number

	@Field()
	source_currency: Currency

	@Field()
	target_wallet_id: string

	@Field()
	target_amount: number

	@Field()
	target_currency: Currency

	@Field()
	timestamp: string

	@Field()
	note: string

	@Field()
	is_deleted: boolean

	@Field({ nullable: true })
	created_at: string | null

	@Field({ nullable: true })
	updated_at: string | null

	@Field({ nullable: true })
	deleted_at: string | null
}
