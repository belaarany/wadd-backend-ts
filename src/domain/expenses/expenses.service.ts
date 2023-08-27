import { Injectable } from "@nestjs/common"
import { In } from "typeorm"
import { ExpensesRepository } from "./expenses.repository"
import { Expense } from "./interfaces/expense.model"
import { CreateExpenseDto } from "./interfaces/expenses.dto"
import { IExpenseService } from "./interfaces/expenses.interfaces"
import { ExpenseFactory } from "./schemas/expense.factory"
import { ExpenseMapper } from "./schemas/expense.mapper"

@Injectable()
export class ExpensesService implements IExpenseService {
  constructor(private readonly expensesRepo: ExpensesRepository) {}

  async create(data: CreateExpenseDto): Promise<Expense> {
    const income = ExpenseFactory.make({
      wallet_id: data.wallet_id,
      amount: data.amount,
      currency: data.currency,
      timestamp: data.timestamp,
      location: data.location,
      related_income_ids: data.related_income_ids,
      note: data.note,
      category_id: data.category_id,
      tags: data.tags,
      group_id: data.group_id,
      attachment_file_ids: data.attachment_file_ids,
    })

    const insertedIncome = await this.expensesRepo.save(income)

    return ExpenseMapper.fromEntity(insertedIncome)
  }

  async update(id: string, data: CreateExpenseDto): Promise<Expense> {
    const expense = await this.expensesRepo.save({
      id,
      ...data,
    })

    return ExpenseMapper.fromEntity(expense)
  }

  async exists(id: string): Promise<boolean> {
    return await this.expensesRepo.exist({ where: { id } })
  }

  async listByWalletIds(ids: string[]): Promise<Expense[]> {
    const entities = await this.expensesRepo.findBy({ wallet_id: In(ids) })

    return entities.map(ExpenseMapper.fromEntity)
  }

  async listByIds(ids: string[]): Promise<Expense[]> {
    const entities = await this.expensesRepo.findBy({ id: In(ids) })

    return entities.map(ExpenseMapper.fromEntity)
  }
}
