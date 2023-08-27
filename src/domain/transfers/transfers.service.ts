import { Injectable } from "@nestjs/common"
import { MultipleEntitiesFoundException } from "src/core/errors/entity.errors"
import { Transfer } from "./interfaces/transfer.model"
import { CreateTransferDto } from "./interfaces/transfers.dto"
import { ITransfersService } from "./interfaces/transfers.interfaces"
import { TransfersRepository } from "./transfers.repository"
import { TransferFactory } from "./schemas/transfer.factory"
import { TransferMapper } from "./schemas/transfer.mapper"
import { In } from "typeorm"

@Injectable()
export class TransfersService implements ITransfersService {
  constructor(private readonly transfersRepo: TransfersRepository) {}

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
    const insertedTransfer = await this.transfersRepo.save(transfer)

    return TransferMapper.fromEntity(insertedTransfer)
  }

  async exists(transferId: string): Promise<boolean> {
    return await this.transfersRepo.exist({ where: { id: transferId } })
  }

  async listByWalletIds(walletIds: string[]): Promise<Transfer[]> {
    const transfers = await this.transfersRepo
      .createQueryBuilder("transfer")
      .where("transfer.source_wallet_id IN (:...walletIds)", { walletIds })
      .orWhere("transfer.target_wallet_id IN (:...walletIds)", { walletIds })
      .getMany()

    return transfers.map(TransferMapper.fromEntity)
  }
}
