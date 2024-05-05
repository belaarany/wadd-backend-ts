import { faker } from "@faker-js/faker"
import { Currency } from "../../../core/interfaces/enums/Currency"
import { IdPrefix } from "../../../core/interfaces/enums/IdPrefix"
import { generateId } from "src/core/utils/GenerateId"
import { Income } from "../interfaces/income.model"
import { CreateIncomeDto } from "../interfaces/incomes.dto"
import { IncomeFactory } from "../schemas/income.factory"

export class IncomeMock {
  // static makeCreateRequest(customValues: Partial<CreateIncomeDto> = {}): CreateIncomeDto {
  //   return {
  //     wallet_id: customValues.wallet_id ?? generateId(IdPrefix.WALLET),
  //     amount: customValues.amount ?? faker.datatype.number(80000),
  //     currency: customValues.currency ?? faker.helpers.arrayElement(Object.values(Currency)),
  //     timestamp: faker.datatype.datetime(),
  //     location: faker.company.name(),
  //     related_expense_ids: new Array(faker.datatype.number(10)).fill(null).map(() => generateId(IdPrefix.EXPENSE)),
  //     note: faker.lorem.sentence(),
  //     category_id: generateId(IdPrefix.CATEGORY),
  //     tags: new Array(faker.datatype.number(10)).fill(null).map(() => faker.lorem.word()),
  //     group_id: generateId(IdPrefix.GROUP),
  //     attachment_file_ids: new Array(faker.datatype.number(4)).fill(null).map(() => generateId(IdPrefix.FILE)),
  //   }
  // }
  // static makeMockObject(): Income {
  //   return IncomeMapper.fromEntity(
  //     IncomeFactory.make({
  //       ...IncomeMock.makeCreateRequest(),
  //     }),
  //   )
  // }
  // static getModelKeys(): string[] {
  //   return [
  //     "id",
  //     "kind",
  //     "wallet_id",
  //     "amount",
  //     "currency",
  //     "timestamp",
  //     "location",
  //     "related_expense_ids",
  //     "note",
  //     "category_id",
  //     "tags",
  //     "group_id",
  //     "attachment_file_ids",
  //     "is_deleted",
  //     "is_cancelled",
  //     "created_at",
  //     "updated_at",
  //     "deleted_at",
  //     "cancelled_at",
  //   ]
  // }
}
