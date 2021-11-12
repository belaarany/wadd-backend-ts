import { Injectable } from "@nestjs/common"
import { IWalletsService } from "./interfaces/wallets.interfaces"
import { Wallet } from "./interfaces/wallet.model"
import { WalletsRepository } from "./wallets.repository"
import { CreateWalletDto, UpdateWalletDto } from "./interfaces/wallets.dto"

@Injectable()
export class WalletsService implements IWalletsService {
	constructor(private readonly walletsRepo: WalletsRepository) {}

	async create(data: CreateWalletDto): Promise<Wallet> {
		const wallet = await this.walletsRepo.create(data)
		return wallet
	}

	async exists(walletId: string): Promise<boolean> {
		try {
			await this.walletsRepo.get(walletId, { is_deleted: false })
			return true
		} catch (e) {
			return false
		}
	}

	async update(walletId: string, walletData: UpdateWalletDto): Promise<Wallet> {
		try {
			const updatedWallet = await this.walletsRepo.update(walletId, { ...walletData, updated_at: new Date() })
			return updatedWallet
		} catch (e) {
			throw e
		}
	}

	async get(walletId: string): Promise<Wallet> {
		try {
			const wallet = await this.walletsRepo.get(walletId, { is_deleted: false })
			return wallet
		} catch (e) {
			throw e
		}
	}

	async listAll(): Promise<Wallet[]> {
		const wallets = await this.walletsRepo.list({ is_deleted: false })
		return wallets
	}

	// TODO: test
	async listByIds(ids: string[]): Promise<Wallet[]> {
		const wallets = await this.walletsRepo.list({ ids: ids, is_deleted: false })
		return wallets
	}

	async listByUserId(userId: string): Promise<Wallet[]> {
		const wallets = await this.walletsRepo.list({ owner_user_id: userId, is_deleted: false })
		return wallets
	}

	async delete(walletId: string): Promise<Wallet> {
		try {
			const deletedWallet = await this.walletsRepo.update(walletId, { is_deleted: true, deleted_at: new Date() })
			return deletedWallet
		} catch (e) {
			throw e
		}
	}
}
