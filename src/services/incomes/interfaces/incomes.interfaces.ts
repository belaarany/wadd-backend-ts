import { Income } from "./income.model"
import { CreateIncomeDto } from "./incomes.dto"

export interface IIncomesService {
	create(data: CreateIncomeDto): Promise<Income>
	exists(incomeId: string): Promise<boolean>
	listByWalletIds(walletIds: string[]): Promise<Income[]>
	listByIds(incomeIds: string[]): Promise<Income[]>
}

export interface IIncomesRepository {
	create(incomeData: Partial<Income>): Promise<Income>
	list(filter?: IncomeRepositoryFilter): Promise<Income[]>
}

export type IncomeRepositoryFilter = {
	ids?: string[]
	wallet_ids?: string[]
}
