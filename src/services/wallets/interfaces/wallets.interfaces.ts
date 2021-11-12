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
	delete(walletId: string): Promise<Wallet>
	// archive(walletId: string): Promise<Wallet>
}

export interface IWalletsRepository {
	create(walletData: Partial<Wallet>): Promise<Wallet>
	update(walletId: string, walletData: Partial<Wallet>): Promise<Wallet>
	get(walletId: string, filter?: WalletRepositoryFilter): Promise<Wallet>
	list(filter?: WalletRepositoryFilter): Promise<Wallet[]>
}

export type WalletRepositoryFilter = {
	owner_user_id?: string
	ids?: string[]
	is_deleted?: boolean
	is_archived?: boolean
}
