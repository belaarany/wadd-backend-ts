import { Injectable } from "@nestjs/common"
import { In } from "typeorm"
import { ExpensesRepository } from "./expenses.repository"
import { CreateExpenseDto } from "./interfaces/expenses.dto"
import { IExpenseService } from "./interfaces/expenses.interfaces"
import { ExpenseEntity } from "./schemas/expense.entity"

@Injectable()
export class ExpensesService implements IExpenseService {
  constructor(private readonly expensesRepo: ExpensesRepository) {}

  async create(data: CreateExpenseDto): Promise<ExpenseEntity> {
    const categoryEntity = await this.expensesRepo.create({
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

    const income = await this.expensesRepo.save(categoryEntity)

    return income
  }

  async update(id: string, data: CreateExpenseDto): Promise<ExpenseEntity> {
    const expense = await this.expensesRepo.save({
      id,
      ...data,
    })

    return expense
  }

  async exists(id: string): Promise<boolean> {
    return await this.expensesRepo.exist({ where: { id } })
  }

  async listByWalletIds(ids: string[]): Promise<ExpenseEntity[]> {
    const entities = await this.expensesRepo.findBy({ wallet_id: In(ids) })

    return entities
  }

  async listByIds(ids: string[]): Promise<ExpenseEntity[]> {
    const entities = await this.expensesRepo.findBy({ id: In(ids) })

    return entities
  }
}
