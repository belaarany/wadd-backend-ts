import { InjectRepository } from "@nestjs/typeorm"
import { EntityNotFoundException } from "src/core/errors/entity.errors"
import { Repository } from "typeorm"
import { Expense } from "./interfaces/expense.model"
import { CreateExpenseDto } from "./interfaces/expenses.dto"
import { IExpenseRepository, ExpenseRepositoryFilter } from "./interfaces/expenses.interfaces"
import { ExpenseEntity } from "./schemas/expense.entity"
import { ExpenseFactory } from "./schemas/expense.factory"
import { ExpenseMapper } from "./schemas/expense.mapper"

export class ExpensesRepository implements IExpenseRepository {
  constructor(
    @InjectRepository(ExpenseEntity)
    private readonly db: Repository<ExpenseEntity>,
  ) {}

  async create(incomeData: CreateExpenseDto): Promise<Expense> {
    const income = ExpenseFactory.make({
      wallet_id: incomeData.wallet_id,
      amount: incomeData.amount,
      currency: incomeData.currency,
      timestamp: incomeData.timestamp,
      location: incomeData.location,
      related_income_ids: incomeData.related_income_ids,
      note: incomeData.note,
      category_id: incomeData.category_id,
      tags: incomeData.tags,
      group_id: incomeData.group_id,
      attachment_file_ids: incomeData.attachment_file_ids,

      created_at: new Date(),
    })
    const insertedIncome = await this.db.save(income)

    return ExpenseMapper.fromEntity(insertedIncome)
  }

  async update(entityId: string, entityData: Partial<Expense>): Promise<Expense> {
    const entity = await this.db.findOneBy({ id: entityId })

    if (!entity) {
      throw new EntityNotFoundException()
    }

    for (const key of Object.keys(entityData)) {
      entity[key] = entityData[key]
    }

    const savedEntity = await this.db.save(entity)

    return ExpenseMapper.fromEntity(savedEntity)
  }

  async list(filter?: ExpenseRepositoryFilter): Promise<Expense[]> {
    filter = filter ?? {}

    const findFilterWhere = {}

    if ("ids" in filter) {
      findFilterWhere["$or"] = filter.ids.map((id) => ({ id: id }))
    }

    if ("wallet_ids" in filter) {
      findFilterWhere["$or"] = filter.wallet_ids.map((wallet_id) => ({ wallet_id: wallet_id }))
    }

    const incomes = await this.db.find({ where: findFilterWhere })

    return incomes.map(ExpenseMapper.fromEntity)
  }
}
