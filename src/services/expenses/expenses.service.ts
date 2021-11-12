import { Injectable } from "@nestjs/common"
import { MultipleEntitiesFoundException } from "../../errors/entity.errors"
import { ExpensesRepository } from "./expenses.repository"
import { Expense } from "./interfaces/expense.model"
import { CreateExpenseDto } from "./interfaces/expenses.dto"
import { IExpenseService } from "./interfaces/expenses.interfaces"

@Injectable()
export class ExpensesService implements IExpenseService {
	constructor(private readonly expensesRepo: ExpensesRepository) {}

	async create(incomeData: CreateExpenseDto): Promise<Expense> {
		const income = await this.expensesRepo.create(incomeData)
		return income
	}

	async exists(expenseId: string): Promise<boolean> {
		const expenses = await this.expensesRepo.list({ ids: [expenseId] })

		if (expenses.length > 1) {
			throw new MultipleEntitiesFoundException()
		}

		if (expenses.length === 0) {
			return false
		}

		return true
	}

	async listByWalletIds(walletIds: string[]): Promise<Expense[]> {
		const incomes = await this.expensesRepo.list({ wallet_ids: walletIds })
		return incomes
	}

	async listByIds(expenseIds: string[]): Promise<Expense[]> {
		const expenses = await this.expensesRepo.list({ ids: expenseIds })
		return expenses
	}
}
