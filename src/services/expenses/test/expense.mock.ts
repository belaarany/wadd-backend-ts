import { CreateExpenseDto } from "../interfaces/expenses.dto"
import { faker } from "@faker-js/faker";
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
      amount: customValues.amount ?? faker.datatype.number(80000),
      currency: customValues.currency ?? faker.helpers.arrayElement(Object.values(Currency)),
      timestamp: faker.datatype.datetime(),
      location: faker.company.name(),
      related_income_ids: new Array(faker.datatype.number(10)).fill(null).map(() => generateId(IdPrefix.INCOME)),
      note: faker.lorem.sentence(),
      category_id: generateId(IdPrefix.CATEGORY),
      tags: new Array(faker.datatype.number(10)).fill(null).map(() => faker.lorem.word()),
      group_id: generateId(IdPrefix.GROUP),
      attachment_file_ids: new Array(faker.datatype.number(4)).fill(null).map(() => generateId(IdPrefix.FILE)),
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
