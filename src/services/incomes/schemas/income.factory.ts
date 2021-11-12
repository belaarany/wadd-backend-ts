import * as Lodash from "lodash"
import { generateId } from "../../../utils/GenerateId"
import { IdPrefix } from "../../../interfaces/enums/IdPrefix"
import { IncomeEntity } from "./income.entity"

export class IncomeFactory {
	static make(incomePartialData: Partial<IncomeEntity>): IncomeEntity {
		const income = new IncomeEntity()

		income.id = generateId(IdPrefix.INCOME)
		income.wallet_id = null
		income.amount = 0
		income.currency = null
		income.timestamp = null
		income.location = ""
		income.related_expense_ids = []
		income.note = ""
		income.category_id = null
		income.tags = []
		income.group_id = null
		income.attachment_file_ids = []
		income.is_deleted = false
		income.is_cancelled = false
		income.created_at = null
		income.updated_at = null
		income.deleted_at = null
		income.cancelled_at = null

		Lodash.forEach(incomePartialData, (value, key) => {
			income[key] = value
		})

		return income
	}
}
