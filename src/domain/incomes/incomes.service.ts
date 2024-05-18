import { Injectable } from "@nestjs/common"
import { In } from "typeorm"
import { IncomesRepository } from "./incomes.repository"
import { CreateIncomeDto, ListByFiltersDto } from "./interfaces/incomes.dto"
import { IIncomesService } from "./interfaces/incomes.interfaces"
import { IncomeEntity } from "./schemas/income.entity"

@Injectable()
export class IncomesService implements IIncomesService {
  constructor(private readonly incomesRepo: IncomesRepository) {}

  async create(incomeData: CreateIncomeDto): Promise<IncomeEntity> {
    const income = this.incomesRepo.create({
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
    })

    const incomeEntity = await this.incomesRepo.save(income)

    return incomeEntity
  }

  async exists(incomeId: string): Promise<boolean> {
    return await this.incomesRepo.exist({ where: { id: incomeId } })
  }

  async listByWalletIds(walletIds: string[]): Promise<IncomeEntity[]> {
    const incomes = await this.incomesRepo.findBy({ wallet_id: In(walletIds) })

    return incomes
  }

  async listByIds(incomeIds: string[]): Promise<IncomeEntity[]> {
    const incomes = await this.incomesRepo.findBy({ id: In(incomeIds) })

    return incomes
  }

  async listByFilters(filters: ListByFiltersDto): Promise<IncomeEntity[]> {
    const qb = this.incomesRepo.createQueryBuilder("income")

    if (filters.wallet_ids) {
      qb.where("income.wallet_id IN (:...walletIds)", { walletIds: filters.wallet_ids })
    }

    if (filters.timestamp) {
      if (filters.timestamp.from) {
        qb.andWhere("income.timestamp >= :from", { from: filters.timestamp.from })
      }

      if (filters.timestamp.to) {
        qb.andWhere("income.timestamp <= :to", { to: filters.timestamp.to })
      }
    }

    return await qb.getMany()
  }
}
