import { Currency } from "src/core/interfaces/enums/Currency"
import { WalletType } from "src/core/interfaces/enums/WalletType"

export type CreateWalletDto = {
  name: string
  order: number
  owner_user_id: string
  initial_balance: number
  default_currency: Currency
  type: WalletType
  color_hex: string
  icon_url: string
}

export type UpdateWalletDto = {
  name: string
  order: number
  initial_balance: number
  default_currency: Currency
  type: WalletType
  color_hex: string
  icon_url: string
}
