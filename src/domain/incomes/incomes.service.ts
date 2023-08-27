import { Injectable } from "@nestjs/common"
import { In } from "typeorm"
import { IncomesRepository } from "./incomes.repository"
import { Income } from "./interfaces/income.model"
import { CreateIncomeDto } from "./interfaces/incomes.dto"
import { IIncomesService } from "./interfaces/incomes.interfaces"
import { IncomeFactory } from "./schemas/income.factory"
import { IncomeMapper } from "./schemas/income.mapper"

@Injectable()
export class IncomesService implements IIncomesService {
  constructor(private readonly incomesRepo: IncomesRepository) {}

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
    })

    const insertedIncome = await this.incomesRepo.save(income)

    return IncomeMapper.fromEntity(insertedIncome)
  }

  async exists(incomeId: string): Promise<boolean> {
    return await this.incomesRepo.exist({ where: { id: incomeId } })
  }

  async listByWalletIds(walletIds: string[]): Promise<Income[]> {
    const incomes = await this.incomesRepo.findBy({ wallet_id: In(walletIds) })

    return incomes.map(IncomeMapper.fromEntity)
  }

  async listByIds(incomeIds: string[]): Promise<Income[]> {
    const incomes = await this.incomesRepo.findBy({ id: In(incomeIds) })

    return incomes.map(IncomeMapper.fromEntity)
  }

  // async getSummary(walletIds: string[]): Promise<any> {
  //   const incomes = await this.incomesRepo.list({ wallet_ids: walletIds })
  //   const sum: SummarizedCollection<"wallets"> = {
  //     wallets: {},
  //     // categories: {},
  //     // tags: {},
  //   }

  //   const running = {}

  //   this.incomesRepo.getRunningSum(walletIds)

  //   for (const income of incomes) {
  //     let timestamp = Moment.utc(income.timestamp)
  //     let timestampKey = timestamp.format("YYYYMM")
  //     if (timestampKey in running === false) {
  //       running[timestampKey] = 0
  //     }
  //     running[timestampKey] += income.amount

  //     if (income.wallet_id in sum.wallets === false) {
  //       sum.wallets[income.wallet_id] = {}
  //     }
  //     if (income.currency in sum.wallets[income.wallet_id] === false) {
  //       sum.wallets[income.wallet_id][income.currency] = 0
  //     }

  //     // sum.wallets[income.wallet_id][income.currency] = new Decimal(sum.wallets[income.wallet_id][income.currency])
  //     //   .add(income.amount)
  //     //   .toNumber()
  //   }

  //   return {
  //     [Kind.INCOME]: sum,
  //   }
  // }
}
