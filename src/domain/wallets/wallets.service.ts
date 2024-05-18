import { Injectable } from "@nestjs/common"
import { In, Repository } from "typeorm"
import { CreateWalletDto, UpdateWalletDto } from "./interfaces/wallets.dto"
import { IWalletsService } from "./interfaces/wallets.interfaces"
import { WalletEntity } from "./schemas/wallet.entity"
import { WalletFactory } from "./schemas/wallet.factory"
import { WalletsRepository } from "./wallets.repository"
import { WalletBalancesViewEntity } from "./schemas/wallet-balances.entity"
import { InjectRepository } from "@nestjs/typeorm"

@Injectable()
export class WalletsService implements IWalletsService {
  constructor(
    private readonly walletsRepo: WalletsRepository,

    @InjectRepository(WalletBalancesViewEntity)
    private readonly wbver: Repository<WalletBalancesViewEntity>,
  ) {}

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

  async listWalletBalances(): Promise<WalletBalancesViewEntity[]> {
    const walletBalances = await this.wbver.find()

    return walletBalances
  }
}
