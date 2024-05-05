import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { IWalletsRepository } from "./interfaces/wallets.interfaces"
import { WalletEntity } from "./schemas/wallet.entity"

@Injectable()
export class WalletsRepository extends Repository<WalletEntity> implements IWalletsRepository {
  constructor(
    @InjectRepository(WalletEntity)
    private readonly repository: Repository<WalletEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner)
  }
}
