import { CreateTransferDto } from "../interfaces/transfers.dto"
import * as Faker from "faker"
import { Transfer } from "../interfaces/transfer.model"
import { generateId } from "../../../utils/GenerateId"
import { IdPrefix } from "../../../interfaces/enums/IdPrefix"
import { TransferFactory } from "../schemas/transfer.factory"
import { TransferMapper } from "../schemas/transfer.mapper"
import { Currency } from "src/interfaces/enums/Currency"

export class TransferMock {
	static makeCreateRequest(): CreateTransferDto {
		return {
			source_wallet_id: generateId(IdPrefix.WALLET),
			source_amount: Faker.datatype.number(80000),
			source_currency: Faker.random.arrayElement(Object.values(Currency)),
			target_wallet_id: generateId(IdPrefix.WALLET),
			target_amount: Faker.datatype.number(80000),
			target_currency: Faker.random.arrayElement(Object.values(Currency)),
			timestamp: Faker.datatype.datetime(),
			note: Faker.lorem.sentence(),
		}
	}

	static makeMockObject(): Transfer {
		return TransferMapper.fromEntity(
			TransferFactory.make({
				...TransferMock.makeCreateRequest(),
			}),
		)
	}

	static getModelKeys(): string[] {
		return [
			"id",
			"kind",
			"source_wallet_id",
			"source_amount",
			"source_currency",
			"target_wallet_id",
			"target_amount",
			"target_currency",
			"timestamp",
			"note",
			"is_deleted",
			"created_at",
			"updated_at",
			"deleted_at",
		]
	}
}
