import { Currency } from "src/core/interfaces/enums/Currency"

export type CreateTransferDto = {
  source_wallet_id: string
  target_wallet_id: string
  amount: number
  timestamp: Date
  note: string
}
