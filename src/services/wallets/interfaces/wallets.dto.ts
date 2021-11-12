import { Currency } from "src/interfaces/enums/Currency"
import { WalletType } from "./wallet.model"

export type CreateWalletDto = {
	name: string
	order: number
	owner_user_id: string
	initial_balance: number
	default_currency: Currency
	type: WalletType
	icon_file_id: string | null
}

export type UpdateWalletDto = {
	name: string
	order: number
	initial_balance: number
	default_currency: Currency
	type: WalletType
	icon_file_id: string | null
}
