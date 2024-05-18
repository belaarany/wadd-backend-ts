import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { IWalletsRepository } from "./interfaces/wallets.interfaces"
import { WalletEntity } from "./schemas/wallet.entity"
import { WalletBalancesViewEntity } from "./schemas/wallet-balances.entity"

// @Injectable()
// export class WalletBalancesRepository extends Repository<WalletBalancesViewEntity> implements IWalletsRepository {
//   constructor(
//     @InjectRepository(WalletEntity)
//     private readonly repository: Repository<WalletEntity>,
//   ) {
//     super(repository.target, repository.manager, repository.queryRunner)
//   }
// }
