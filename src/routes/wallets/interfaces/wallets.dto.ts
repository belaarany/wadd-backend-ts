import { Currency } from "src/interfaces/types/Currency"
import { WalletType } from "src/interfaces/types/WalletType"

export type CreateWalletDTO = {
	name: string
	order: number
	owner_user_id: string
	initial_balance: number
	default_currency: Currency
	type: WalletType
	icon_file_id: string | null
}
