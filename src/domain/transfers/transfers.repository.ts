import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { ITransfersRepository } from "./interfaces/transfers.interfaces"
import { TransferEntity } from "./schemas/transfer.entity"

export class TransfersRepository extends Repository<TransferEntity> implements ITransfersRepository {
  constructor(
    @InjectRepository(TransferEntity)
    private readonly repository: Repository<TransferEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner)
  }
}
