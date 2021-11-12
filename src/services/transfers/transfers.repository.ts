import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { Transfer } from "./interfaces/transfer.model"
import { CreateTransferDto } from "./interfaces/transfers.dto"
import { ITransfersRepository, TransferRepositoryFilter } from "./interfaces/transfers.interfaces"
import { TransferEntity } from "./schemas/transfer.entity"
import { TransferFactory } from "./schemas/transfer.factory"
import { TransferMapper } from "./schemas/transfer.mapper"

export class TransfersRepository implements ITransfersRepository {
	constructor(
		@InjectRepository(TransferEntity)
		private readonly db: Repository<TransferEntity>,
	) {}

	async create(transferData: CreateTransferDto): Promise<Transfer> {
		const transfer = TransferFactory.make({
			source_wallet_id: transferData.source_wallet_id,
			source_amount: transferData.source_amount,
			source_currency: transferData.source_currency,
			target_wallet_id: transferData.target_wallet_id,
			target_amount: transferData.target_amount,
			target_currency: transferData.target_currency,
			timestamp: transferData.timestamp,
			note: transferData.note,

			created_at: new Date(),
		})
		const insertedTransfer = await this.db.save(transfer)

		return TransferMapper.fromEntity(insertedTransfer)
	}

	async list(filter?: TransferRepositoryFilter): Promise<Transfer[]> {
		const findFilterWhere = {}

		if ("ids" in filter) {
			findFilterWhere["$or"] = filter.ids.map((id) => ({ id: id }))
		}

		if ("wallet_ids" in filter) {
			findFilterWhere["$or"] = [
				...filter.wallet_ids.map((wallet_id) => ({ source_wallet_id: wallet_id })),
				...filter.wallet_ids.map((wallet_id) => ({ target_wallet_id: wallet_id })),
			]
		}

		const transfers = await this.db.find({ where: findFilterWhere })

		return transfers.map(TransferMapper.fromEntity)
	}
}
