import * as Lodash from "lodash"
import { generateId } from "../../../utils/GenerateId"
import { IdPrefix } from "../../../interfaces/enums/IdPrefix"
import { ExpenseEntity } from "./expense.entity"

export class ExpenseFactory {
	static make(incomePartialData: Partial<ExpenseEntity>): ExpenseEntity {
		const expense = new ExpenseEntity()

		expense.id = generateId(IdPrefix.EXPENSE)
		expense.wallet_id = null
		expense.amount = 0
		expense.currency = null
		expense.timestamp = null
		expense.location = ""
		expense.related_income_ids = []
		expense.note = ""
		expense.category_id = null
		expense.tags = []
		expense.group_id = null
		expense.attachment_file_ids = []
		expense.is_deleted = false
		expense.is_cancelled = false
		expense.created_at = null
		expense.updated_at = null
		expense.deleted_at = null
		expense.cancelled_at = null

		Lodash.forEach(incomePartialData, (value, key) => {
			expense[key] = value
		})

		return expense
	}
}
