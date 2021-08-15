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
export class IncomeGQLModel {
	@Field((type) => ID)
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

	@Field()
	location: string

	@Field((type) => [String])
	related_expense_ids: string[]

	@Field()
	note: string

	@Field()
	category_id: string

	@Field((type) => [String])
	tags: string[]

	@Field({ nullable: true })
	group_id: string | null

	@Field((type) => [String])
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
