import { Expense } from "./expense.model"
import { CreateExpenseDto, UpdateExpenseDto } from "./expenses.dto"

export interface IExpenseService {
  create(data: CreateExpenseDto): Promise<Expense>
  update(id: string, data: UpdateExpenseDto): Promise<Expense>
  exists(id: string): Promise<boolean>
  listByWalletIds(ids: string[]): Promise<Expense[]>
  listByIds(ids: string[]): Promise<Expense[]>
}

export interface IExpenseRepository {}
