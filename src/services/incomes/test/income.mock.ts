import * as Faker from "faker"
import { Currency } from "../../../interfaces/enums/Currency"
import { IdPrefix } from "../../../interfaces/enums/IdPrefix"
import { generateId } from "../../../utils/GenerateId"
import { Income } from "../interfaces/income.model"
import { CreateIncomeDto } from "../interfaces/incomes.dto"
import { IncomeFactory } from "../schemas/income.factory"
import { IncomeMapper } from "../schemas/income.mapper"

export class IncomeMock {
	static makeCreateRequest(customValues: Partial<CreateIncomeDto> = {}): CreateIncomeDto {
		return {
			wallet_id: customValues.wallet_id ?? generateId(IdPrefix.WALLET),
			amount: customValues.amount ?? Faker.datatype.number(80000),
			currency: customValues.currency ?? Faker.random.arrayElement(Object.values(Currency)),
			timestamp: Faker.datatype.datetime(),
			location: Faker.company.companyName(),
			related_expense_ids: new Array(Faker.datatype.number(10))
				.fill(null)
				.map(() => generateId(IdPrefix.EXPENSE)),
			note: Faker.lorem.sentence(),
			category_id: generateId(IdPrefix.CATEGORY),
			tags: new Array(Faker.datatype.number(10)).fill(null).map(() => Faker.lorem.word()),
			group_id: generateId(IdPrefix.GROUP),
			attachment_file_ids: new Array(Faker.datatype.number(4)).fill(null).map(() => generateId(IdPrefix.FILE)),
		}
	}

	static makeMockObject(): Income {
		return IncomeMapper.fromEntity(
			IncomeFactory.make({
				...IncomeMock.makeCreateRequest(),
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
			"related_expense_ids",
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
