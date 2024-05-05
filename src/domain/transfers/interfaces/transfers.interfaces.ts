import { TransferEntity } from "../schemas/transfer.entity"
import { CreateTransferDto } from "./transfers.dto"

export interface ITransfersService {
  create(data: CreateTransferDto): Promise<TransferEntity>
  exists(transferId: string): Promise<boolean>
  listByWalletIds(walletIds: string[]): Promise<TransferEntity[]>
}

export interface ITransfersRepository {}
