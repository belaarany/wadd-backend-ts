import { Injectable } from "@nestjs/common"
import Decimal from "decimal.js"
import { MultipleEntitiesFoundException } from "../../errors/entity.errors"
import { ISummarizable, Summarized, SummarizedCollection } from "../../interfaces/contracts/Summarizable.interface"
import { Kind } from "../../interfaces/enums/Kind"
import { IncomesRepository } from "./incomes.repository"
import { Income } from "./interfaces/income.model"
import { CreateIncomeDto } from "./interfaces/incomes.dto"
import { IIncomesService } from "./interfaces/incomes.interfaces"

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

	async getSummary(walletIds: string[]): Promise<Summarized<Kind.INCOME, SummarizedCollection<"wallets">>> {
		const incomes = await this.incomesRepo.list({ wallet_ids: walletIds })
		const sum: SummarizedCollection<"wallets"> = {
			wallets: {},
			// categories: {},
			// tags: {},
		}

		for (const income of incomes) {
			if (income.wallet_id in sum.wallets === false) {
				sum.wallets[income.wallet_id] = {}
			}
			if (income.currency in sum.wallets[income.wallet_id] === false) {
				sum.wallets[income.wallet_id][income.currency] = 0
			}

			sum.wallets[income.wallet_id][income.currency] = new Decimal(sum.wallets[income.wallet_id][income.currency])
				.add(income.amount)
				.toNumber()
		}

		return {
			[Kind.INCOME]: sum,
		}
	}
}
