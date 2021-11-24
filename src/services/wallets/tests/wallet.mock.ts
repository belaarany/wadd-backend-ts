import { Currency } from "src/interfaces/enums/Currency"
import { Wallet, WalletType } from "../interfaces/wallet.model"
import { CreateWalletDto } from "../interfaces/wallets.dto"

export const mockWalletPartial: CreateWalletDto = {
	name: "Test Wallet 2",
	order: 1,
	owner_user_id: "72332157-398d-4fa1-9376-7f2d05175ba9",
	initial_balance: 0,
	default_currency: Currency.HUF,
	type: WalletType.CASH,
	color_hex: "7F00FF",
	icon_url: "https://logo.clearbit.com/spendesk.com",
}

export const mockWallet: Wallet = {
	id: "60e880dbc1c48954aac3bca0",
	kind: "wallet",
	name: "Test Wallet 2",
	order: 1,
	owner_user_id: "72332157-398d-4fa1-9376-7f2d05175ba9",
	initial_balance: 0,
	default_currency: Currency.HUF,
	type: WalletType.CASH,
	color_hex: "7F00FF",
	icon_url: "https://logo.clearbit.com/spendesk.com",
	is_deleted: false,
	is_archived: false,
	created_at: new Date("2021-07-09T17:01:15.819Z"),
	updated_at: null,
	deleted_at: null,
	archived_at: null,
}
