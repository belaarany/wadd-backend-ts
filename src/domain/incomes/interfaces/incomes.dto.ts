import { Currency } from "src/core/interfaces/enums/Currency"

export type CreateIncomeDto = {
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
}

export type ListByFiltersDto = {
  wallet_ids?: string[]
  timestamp?: {
    from?: Date
    to?: Date
  }
}
