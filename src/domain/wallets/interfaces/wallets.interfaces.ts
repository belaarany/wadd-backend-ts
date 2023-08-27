import { Wallet } from "./wallet.model"
import { CreateWalletDto, UpdateWalletDto } from "./wallets.dto"

export interface IWalletsService {
  create(data: CreateWalletDto): Promise<Wallet>
  exists(walletId: string): Promise<boolean>
  update(walletId: string, walletData: UpdateWalletDto): Promise<Wallet>
  get(walletId: string): Promise<Wallet>
  listAll(): Promise<Wallet[]>
  listByIds(walletIds: string[]): Promise<Wallet[]>
  listByUserId(userId: string): Promise<Wallet[]>
  delete(walletId: string): Promise<string>
  // archive(walletId: string): Promise<Wallet>
}

export interface IWalletsRepository {}
