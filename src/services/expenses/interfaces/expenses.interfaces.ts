import { Expense } from "./expense.model"
import { CreateExpenseDto } from "./expenses.dto"

export interface IExpenseService {
	create(data: CreateExpenseDto): Promise<Expense>
	exists(expenseId: string): Promise<boolean>
	listByWalletIds(walletIds: string[]): Promise<Expense[]>
	listByIds(expenseIds: string[]): Promise<Expense[]>
}

export interface IExpenseRepository {
	create(incomeData: Partial<Expense>): Promise<Expense>
	list(filter?: ExpenseRepositoryFilter): Promise<Expense[]>
}

export type ExpenseRepositoryFilter = {
	ids?: string[]
	wallet_ids?: string[]
}
