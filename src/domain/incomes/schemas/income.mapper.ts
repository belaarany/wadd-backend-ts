import { Income } from "../interfaces/income.model"
import { IncomeEntity } from "./income.entity"

export class IncomeMapper {
  static fromEntity(document: IncomeEntity): Income {
    return {
      id: document.id,
      kind: "income",
      wallet_id: document.wallet_id,
      amount: document.amount,
      currency: document.currency,
      timestamp: document.timestamp,
      location: document.location,
      related_expense_ids: document.related_expense_ids || [],
      note: document.note,
      category_id: document.category_id,
      tags: document.tags,
      group_id: document.group_id || null,
      attachment_file_ids: document.attachment_file_ids || [],
      is_deleted: document.is_deleted,
      is_cancelled: document.is_cancelled,
      created_at: document.created_at,
      updated_at: document.updated_at,
      deleted_at: document.deleted_at,
      cancelled_at: document.cancelled_at,
    }
  }
}
