import { Injectable } from "@nestjs/common"
import { MultipleEntitiesFoundException } from "../../errors/entity.errors"
import { ExpensesRepository } from "./expenses.repository"
import { Expense } from "./interfaces/expense.model"
import { CreateExpenseDto } from "./interfaces/expenses.dto"
import { IExpenseService } from "./interfaces/expenses.interfaces"

@Injectable()
export class ExpensesService implements IExpenseService {
  constructor(private readonly expensesRepo: ExpensesRepository) {}

  async create(data: CreateExpenseDto): Promise<Expense> {
    const entity = await this.expensesRepo.create(data)
    return entity
  }

  // TODO: not tested yet
  async update(id: string, data: CreateExpenseDto): Promise<Expense> {
    const entity = await this.expensesRepo.update(id, data)
    return entity
  }

  async exists(id: string): Promise<boolean> {
    const entity = await this.expensesRepo.list({ ids: [id] })

    if (entity.length > 1) {
      throw new MultipleEntitiesFoundException()
    }

    if (entity.length === 0) {
      return false
    }

    return true
  }

  async listByWalletIds(ids: string[]): Promise<Expense[]> {
    const entities = await this.expensesRepo.list({ wallet_ids: ids })
    return entities
  }

  async listByIds(ids: string[]): Promise<Expense[]> {
    const entities = await this.expensesRepo.list({ ids: ids })
    return entities
  }
}
