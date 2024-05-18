import { Income } from "./income.model"
import { CreateIncomeDto, ListByFiltersDto } from "./incomes.dto"

export interface IIncomesService {
  create(data: CreateIncomeDto): Promise<Income>
  exists(incomeId: string): Promise<boolean>
  listByWalletIds(walletIds: string[]): Promise<Income[]>
  listByIds(incomeIds: string[]): Promise<Income[]>
  listByFilters(filters: ListByFiltersDto): Promise<Income[]>
}

export interface IIncomesRepository {}

export type IncomeRepositoryFilter = {
  ids?: string[]
  wallet_ids?: string[]
}
