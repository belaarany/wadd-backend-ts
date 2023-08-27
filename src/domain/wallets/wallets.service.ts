import { Injectable } from "@nestjs/common"
import { IWalletsService } from "./interfaces/wallets.interfaces"
import { Wallet } from "./interfaces/wallet.model"
import { WalletsRepository } from "./wallets.repository"
import { CreateWalletDto, UpdateWalletDto } from "./interfaces/wallets.dto"
import { WalletFactory } from "./schemas/wallet.factory"
import { WalletMapper } from "./schemas/wallet.mapper"
import { In } from "typeorm"

@Injectable()
export class WalletsService implements IWalletsService {
  constructor(private readonly walletsRepo: WalletsRepository) {}

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
    })

    const insertedWallet = await this.walletsRepo.save(wallet)

    return WalletMapper.fromEntity(insertedWallet)
  }

  async exists(walletId: string): Promise<boolean> {
    return await this.walletsRepo.exist({ where: { id: walletId } })
  }

  async update(walletId: string, walletData: UpdateWalletDto): Promise<Wallet> {
    const wallet = await this.walletsRepo.save({
      id: walletId,
      ...walletData,
    })

    return WalletMapper.fromEntity(wallet)
  }

  async get(walletId: string): Promise<Wallet> {
    const wallet = await this.walletsRepo.findOneBy({ id: walletId })

    return WalletMapper.fromEntity(wallet)
  }

  async listAll(): Promise<Wallet[]> {
    const wallets = await this.walletsRepo.find()

    return wallets.map(WalletMapper.fromEntity)
  }

  async listByIds(ids: string[]): Promise<Wallet[]> {
    const wallets = await this.walletsRepo.findBy({ id: In(ids) })

    return wallets.map(WalletMapper.fromEntity)
  }

  async listByUserId(userId: string): Promise<Wallet[]> {
    const wallets = await this.walletsRepo.findBy({ owner_user_id: userId })

    return wallets.map(WalletMapper.fromEntity)
  }

  async delete(walletId: string): Promise<string> {
    try {
      await this.walletsRepo.softDelete(walletId)

      return walletId
    } catch (e) {
      console.log(e)
      throw e
    }
  }
}
