import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { IIncomesRepository } from "./interfaces/incomes.interfaces"
import { IncomeEntity } from "./schemas/income.entity"

export class IncomesRepository extends Repository<IncomeEntity> implements IIncomesRepository {
  constructor(
    @InjectRepository(IncomeEntity)
    private readonly repository: Repository<IncomeEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner)
  }
}
