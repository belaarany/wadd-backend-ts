import { Injectable } from "@nestjs/common"
import { MultipleEntitiesFoundException } from "../../core/errors/entity.errors"
import { ISummarizable, Summarized, SummarizedCollection } from "../../core/interfaces/contracts/Summarizable.interface"
import { Kind } from "../../core/interfaces/enums/Kind"
import { IncomesRepository } from "./incomes.repository"
import { Income } from "./interfaces/income.model"
import { CreateIncomeDto } from "./interfaces/incomes.dto"
import { IIncomesService } from "./interfaces/incomes.interfaces"
import * as _ from "lodash"
import * as Moment from "moment"

@Injectable()
export class IncomesService implements IIncomesService, ISummarizable {
  constructor(private readonly incomesRepo: IncomesRepository) {}

  async create(incomeData: CreateIncomeDto): Promise<Income> {
    const income = await this.incomesRepo.create(incomeData)
    return income
  }

  async exists(incomeId: string): Promise<boolean> {
    const incomes = await this.incomesRepo.list({ ids: [incomeId] })

    if (incomes.length > 1) {
      throw new MultipleEntitiesFoundException()
    }

    if (incomes.length === 0) {
      return false
    }

    return true
  }

  async listByWalletIds(walletIds: string[]): Promise<Income[]> {
    const incomes = await this.incomesRepo.list({ wallet_ids: walletIds })
    return incomes
  }

  async listByIds(incomeIds: string[]): Promise<Income[]> {
    const incomes = await this.incomesRepo.list({ ids: incomeIds })
    return incomes
  }

  async getSummary(walletIds: string[]): Promise<any> {
    const incomes = await this.incomesRepo.list({ wallet_ids: walletIds })
    const sum: SummarizedCollection<"wallets"> = {
      wallets: {},
      // categories: {},
      // tags: {},
    }

    const running = {}

    this.incomesRepo.getRunningSum(walletIds)

    for (const income of incomes) {
      let timestamp = Moment.utc(income.timestamp)
      let timestampKey = timestamp.format("YYYYMM")
      if (timestampKey in running === false) {
        running[timestampKey] = 0
      }
      running[timestampKey] += income.amount

      if (income.wallet_id in sum.wallets === false) {
        sum.wallets[income.wallet_id] = {}
      }
      if (income.currency in sum.wallets[income.wallet_id] === false) {
        sum.wallets[income.wallet_id][income.currency] = 0
      }

      // sum.wallets[income.wallet_id][income.currency] = new Decimal(sum.wallets[income.wallet_id][income.currency])
      //   .add(income.amount)
      //   .toNumber()
    }

    return {
      [Kind.INCOME]: sum,
    }
  }
}
