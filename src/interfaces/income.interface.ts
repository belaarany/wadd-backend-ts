import { Currency } from "./enums/Currency"

export type Income = {
	readonly id: string
	readonly kind: string
	wallet_id: string
	amount: number
	currency: Currency
	timestamp: Date
	location: string
	related_expense_ids: string[]
	note: string
	category_id: string
	tags: string[]
	group_id: string | null
	attachment_file_ids: string[]
	is_deleted: boolean
	is_cancelled: boolean
	created_at: Date
	updated_at: Date
	deleted_at: Date
	cancelled_at: Date
}
