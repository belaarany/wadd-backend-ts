import { WalletEntity } from "../schemas/wallet.entity"
import { CreateWalletDto, UpdateWalletDto } from "./wallets.dto"

export interface IWalletsService {
  create(data: CreateWalletDto): Promise<WalletEntity>
  exists(walletId: string): Promise<boolean>
  update(walletId: string, walletData: UpdateWalletDto): Promise<WalletEntity>
  get(walletId: string): Promise<WalletEntity>
  listAll(): Promise<WalletEntity[]>
  listByIds(walletIds: string[]): Promise<WalletEntity[]>
  listByUserId(userId: string): Promise<WalletEntity[]>
  delete(walletId: string): Promise<string>
  // archive(walletId: string): Promise<Wallet>
}

export interface IWalletsRepository {}
