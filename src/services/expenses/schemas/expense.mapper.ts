import { Expense } from "../interfaces/expense.model"
import { ExpenseEntity } from "./expense.entity"

export class ExpenseMapper {
  static fromEntity(document: ExpenseEntity): Expense {
    return {
      id: document.id,
      kind: "expense",
      wallet_id: document.wallet_id,
      amount: document.amount,
      currency: document.currency,
      timestamp: document.timestamp,
      location: document.location,
      related_income_ids: document.related_income_ids || [],
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
