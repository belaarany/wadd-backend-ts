import { Currency } from "src/interfaces/enums/Currency"

export type Wallet = {
  readonly id: string
  readonly kind: string
  name: string
  order: number
  owner_user_id: string
  initial_balance: number
  default_currency: Currency
  type: WalletType
  color_hex: string
  icon_url: string
  is_deleted: boolean
  is_archived: boolean
  created_at: Date
  updated_at: Date
  deleted_at: Date
  archived_at: Date
}

export enum WalletType {
  CREDIT_CARD = "CREDIT_CARD",
  CASH = "CASH",
}
