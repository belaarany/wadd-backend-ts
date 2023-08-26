import { Currency } from "src/interfaces/enums/Currency"

export type CreateTransferDto = {
  source_wallet_id: string
  source_amount: number
  source_currency: Currency
  target_wallet_id: string
  target_amount: number
  target_currency: Currency
  timestamp: Date
  note: string
}
