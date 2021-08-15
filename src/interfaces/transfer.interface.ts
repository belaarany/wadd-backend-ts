import { Currency } from "./types/Currency";

export type Transfer = {
	readonly id: string
	readonly kind: string
	source_wallet_id: string
	source_amount: number
	source_currency: Currency
	target_wallet_id: string
	target_amount: number
	target_currency: Currency
	timestamp: Date
	note: string
	is_deleted: boolean
	created_at: Date
	updated_at: Date
	deleted_at: Date
}