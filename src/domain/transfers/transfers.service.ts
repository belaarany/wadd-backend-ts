import { Injectable } from "@nestjs/common"
import { CreateTransferDto } from "./interfaces/transfers.dto"
import { ITransfersService } from "./interfaces/transfers.interfaces"
import { TransferEntity } from "./schemas/transfer.entity"
import { TransfersRepository } from "./transfers.repository"

@Injectable()
export class TransfersService implements ITransfersService {
  constructor(private readonly transfersRepo: TransfersRepository) {}

  async create(transferData: CreateTransferDto): Promise<TransferEntity> {
    const transfer = await this.transfersRepo.create({
      source_wallet_id: transferData.source_wallet_id,
      target_wallet_id: transferData.target_wallet_id,
      amount: transferData.amount,
      timestamp: transferData.timestamp,
      note: transferData.note,

      created_at: new Date(),
    })
    const transferEntity = await this.transfersRepo.save(transfer)

    return transferEntity
  }

  async exists(transferId: string): Promise<boolean> {
    return await this.transfersRepo.exist({ where: { id: transferId } })
  }

  async listByWalletIds(walletIds: string[]): Promise<TransferEntity[]> {
    const transfers = await this.transfersRepo
      .createQueryBuilder("transfer")
      .where("transfer.source_wallet_id IN (:...walletIds)", { walletIds })
      .orWhere("transfer.target_wallet_id IN (:...walletIds)", { walletIds })
      .getMany()

    return transfers
  }
}
