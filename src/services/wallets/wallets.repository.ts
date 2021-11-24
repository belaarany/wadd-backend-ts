import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { EntityNotFoundException } from "src/errors/entity.errors"
import { Repository } from "typeorm"
import { Wallet } from "./interfaces/wallet.model"
import { CreateWalletDto } from "./interfaces/wallets.dto"
import { IWalletsRepository, WalletRepositoryFilter } from "./interfaces/wallets.interfaces"
import { WalletEntity } from "./schemas/wallet.entity"
import { WalletFactory } from "./schemas/wallet.factory"
import { WalletMapper } from "./schemas/wallet.mapper"

@Injectable()
export class WalletsRepository implements IWalletsRepository {
	constructor(
		@InjectRepository(WalletEntity)
		private readonly db: Repository<WalletEntity>,
	) {}

	async create(data: CreateWalletDto): Promise<Wallet> {
		const wallet = WalletFactory.make({
			name: data.name,
			order: data.order,
			owner_user_id: data.owner_user_id,
			initial_balance: data.initial_balance,
			default_currency: data.default_currency,
			type: data.type,
			color_hex: data.color_hex,
			icon_url: data.icon_url,
			created_at: new Date(),
		})
		const insertedWallet = await this.db.save(wallet)

		return WalletMapper.fromEntity(insertedWallet)
	}

	async update(walletId: string, walletData: Partial<Wallet>): Promise<Wallet> {
		const wallet = await this.db.findOne({ id: walletId })

		if (!wallet) {
			throw new EntityNotFoundException()
		}

		for (const key of Object.keys(walletData)) {
			wallet[key] = walletData[key]
		}

		const savedWallet = await this.db.save(wallet)

		return WalletMapper.fromEntity(savedWallet)
	}

	async get(walletId: string, filter?: WalletRepositoryFilter): Promise<Wallet> {
		const wallet = await this.db.findOne({ where: { id: walletId, ...filter } })

		if (!wallet) {
			throw new EntityNotFoundException()
		}

		return WalletMapper.fromEntity(wallet)
	}

	async list(filter?: WalletRepositoryFilter): Promise<Wallet[]> {
		filter = filter ?? {}

		const findFilterWhere = {}

		if ("ids" in filter) {
			findFilterWhere["$or"] = filter.ids.map((id) => ({ id: id }))
		}

		if ("owner_user_id" in filter) {
			findFilterWhere["owner_user_id"] = filter.owner_user_id
		}

		if ("is_deleted" in filter) {
			findFilterWhere["is_deleted"] = filter.is_deleted
		}

		const wallets = await this.db.find({ where: findFilterWhere })

		return wallets.map(WalletMapper.fromEntity)
	}
}
