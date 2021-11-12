import { Currency } from "./enums/Currency"
import { WalletType } from "./enums/WalletType"

export type Wallet = {
	readonly id: string
	readonly kind: string
	name: string
	order: number
	owner_user_id: string
	initial_balance: number
	default_currency: Currency
	type: WalletType
	icon_file_id: string | null
	is_deleted: boolean
	is_archived: boolean
	created_at: Date
	updated_at: Date
	deleted_at: Date
	archived_at: Date
}
