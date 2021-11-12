import { CreateExpenseDto } from "../interfaces/expenses.dto"
import * as Faker from "faker"
import { Expense } from "../interfaces/expense.model"
import { IdPrefix } from "../../../interfaces/enums/IdPrefix"
import { ExpenseFactory } from "../schemas/expense.factory"
import { ExpenseMapper } from "../schemas/expense.mapper"
import { Currency } from "../../../interfaces/enums/Currency"
import { generateId } from "../../../utils/GenerateId"

export class ExpenseMock {
	static makeCreateRequest(customValues: Partial<CreateExpenseDto> = {}): CreateExpenseDto {
		return {
			wallet_id: customValues.wallet_id ?? generateId(IdPrefix.WALLET),
			amount: customValues.amount ?? Faker.datatype.number(80000),
			currency: customValues.currency ?? Faker.random.arrayElement(Object.values(Currency)),
			timestamp: Faker.datatype.datetime(),
			location: Faker.company.companyName(),
			related_income_ids: new Array(Faker.datatype.number(10)).fill(null).map(() => generateId(IdPrefix.INCOME)),
			note: Faker.lorem.sentence(),
			category_id: generateId(IdPrefix.CATEGORY),
			tags: new Array(Faker.datatype.number(10)).fill(null).map(() => Faker.lorem.word()),
			group_id: generateId(IdPrefix.GROUP),
			attachment_file_ids: new Array(Faker.datatype.number(4)).fill(null).map(() => generateId(IdPrefix.FILE)),
		}
	}

	static makeMockObject(): Expense {
		return ExpenseMapper.fromEntity(
			ExpenseFactory.make({
				...ExpenseMock.makeCreateRequest(),
			}),
		)
	}

	static getModelKeys(): string[] {
		return [
			"id",
			"kind",
			"wallet_id",
			"amount",
			"currency",
			"timestamp",
			"location",
			"related_income_ids",
			"note",
			"category_id",
			"tags",
			"group_id",
			"attachment_file_ids",
			"is_deleted",
			"is_cancelled",
			"created_at",
			"updated_at",
			"deleted_at",
			"cancelled_at",
		]
	}
}
