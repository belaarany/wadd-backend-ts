import { Transfer } from "./transfer.model"
import { CreateTransferDto } from "./transfers.dto"

export interface ITransfersService {
  create(data: CreateTransferDto): Promise<Transfer>
  exists(transferId: string): Promise<boolean>
  listByWalletIds(walletIds: string[]): Promise<Transfer[]>
}

export interface ITransfersRepository {
  create(transferData: Partial<Transfer>): Promise<Transfer>
  list(filter?: TransferRepositoryFilter): Promise<Transfer[]>
}

export type TransferRepositoryFilter = {
  ids?: string[]
  wallet_ids?: string[]
}
