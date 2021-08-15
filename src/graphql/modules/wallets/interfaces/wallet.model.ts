import { Field, ID, ObjectType, registerEnumType } from "@nestjs/graphql"
import { Currency } from "src/interfaces/types/Currency"
import { WalletType } from "src/interfaces/types/WalletType"

registerEnumType(Currency, {
	name: "Currency",
})
registerEnumType(WalletType, {
	name: "WalletType",
})

@ObjectType()
export class WalletGQLModel {
	@Field((type) => ID)
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

	@Field((type) => Currency)
	default_currency: Currency

	@Field((type) => WalletType)
	type: WalletType

	@Field({ nullable: true })
	icon_file_id: string | null

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
