import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { Income } from "./interfaces/income.model"
import { CreateIncomeDto } from "./interfaces/incomes.dto"
import { IIncomesRepository, IncomeRepositoryFilter } from "./interfaces/incomes.interfaces"
import { IncomeEntity } from "./schemas/income.entity"
import { IncomeFactory } from "./schemas/income.factory"
import { IncomeMapper } from "./schemas/income.mapper"

export class IncomesRepository implements IIncomesRepository {
  constructor(
    @InjectRepository(IncomeEntity)
    private readonly db: Repository<IncomeEntity>,
  ) {}

  async create(incomeData: CreateIncomeDto): Promise<Income> {
    const income = IncomeFactory.make({
      wallet_id: incomeData.wallet_id,
      amount: incomeData.amount,
      currency: incomeData.currency,
      timestamp: incomeData.timestamp,
      location: incomeData.location,
      related_expense_ids: incomeData.related_expense_ids,
      note: incomeData.note,
      category_id: incomeData.category_id,
      tags: incomeData.tags,
      group_id: incomeData.group_id,
      attachment_file_ids: incomeData.attachment_file_ids,

      created_at: new Date(),
    })
    const insertedIncome = await this.db.save(income)

    return IncomeMapper.fromEntity(insertedIncome)
  }

  async list(filter?: IncomeRepositoryFilter): Promise<Income[]> {
    filter = filter ?? {}

    const findFilterWhere = {}

    if ("ids" in filter) {
      findFilterWhere["$or"] = filter.ids.map((id) => ({ id: id }))
    }

    if ("wallet_ids" in filter) {
      findFilterWhere["$or"] = filter.wallet_ids.map((wallet_id) => ({ wallet_id: wallet_id }))
    }

    const incomes = await this.db.find({ where: findFilterWhere })

    return incomes.map(IncomeMapper.fromEntity)
  }

  async getRunningSum(walletIds: string[]): Promise<any> {
    // this.db.manager.
  }
}
