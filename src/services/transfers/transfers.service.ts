import { Injectable } from "@nestjs/common"
import { MultipleEntitiesFoundException } from "src/errors/entity.errors"
import { Transfer } from "./interfaces/transfer.model"
import { CreateTransferDto } from "./interfaces/transfers.dto"
import { ITransfersService } from "./interfaces/transfers.interfaces"
import { TransfersRepository } from "./transfers.repository"

@Injectable()
export class TransfersService implements ITransfersService {
  constructor(private readonly transfersRepo: TransfersRepository) {}

  async create(transferData: CreateTransferDto): Promise<Transfer> {
    const transfer = await this.transfersRepo.create(transferData)
    return transfer
  }

  async exists(transferId: string): Promise<boolean> {
    const transfers = await this.transfersRepo.list({ ids: [transferId] })

    if (transfers.length > 1) {
      throw new MultipleEntitiesFoundException()
    }

    if (transfers.length === 0) {
      return false
    }

    return true
  }

  async listByWalletIds(walletIds: string[]): Promise<Transfer[]> {
    const transfers = await this.transfersRepo.list({ wallet_ids: walletIds })
    return transfers
  }
}
