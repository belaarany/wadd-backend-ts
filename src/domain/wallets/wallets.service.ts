import { Injectable } from "@nestjs/common"
import { In } from "typeorm"
import { CreateWalletDto, UpdateWalletDto } from "./interfaces/wallets.dto"
import { IWalletsService } from "./interfaces/wallets.interfaces"
import { WalletEntity } from "./schemas/wallet.entity"
import { WalletFactory } from "./schemas/wallet.factory"
import { WalletsRepository } from "./wallets.repository"

@Injectable()
export class WalletsService implements IWalletsService {
  constructor(private readonly walletsRepo: WalletsRepository) {}

  async create(data: CreateWalletDto): Promise<WalletEntity> {
    const walletEntity = await this.walletsRepo.create(data)

    const wallet = await this.walletsRepo.save(walletEntity)

    return wallet
  }

  async exists(walletId: string): Promise<boolean> {
    return await this.walletsRepo.exist({ where: { id: walletId } })
  }

  async update(walletId: string, walletData: UpdateWalletDto): Promise<WalletEntity> {
    const wallet = await this.walletsRepo.save({
      id: walletId,
      ...walletData,
    })

    return wallet
  }

  async get(walletId: string): Promise<WalletEntity> {
    const wallet = await this.walletsRepo.findOneBy({ id: walletId })

    return wallet
  }

  async listAll(): Promise<WalletEntity[]> {
    const wallets = await this.walletsRepo.find()

    return wallets
  }

  async listByIds(ids: string[]): Promise<WalletEntity[]> {
    const wallets = await this.walletsRepo.findBy({ id: In(ids) })

    return wallets
  }

  async listByUserId(userId: string): Promise<WalletEntity[]> {
    const wallets = await this.walletsRepo.findBy({ owner_user_id: userId })

    return wallets
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
