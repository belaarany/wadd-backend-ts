import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { IExpenseRepository } from "./interfaces/expenses.interfaces"
import { ExpenseEntity } from "./schemas/expense.entity"

export class ExpensesRepository extends Repository<ExpenseEntity> implements IExpenseRepository {
  constructor(
    @InjectRepository(ExpenseEntity)
    private readonly repository: Repository<ExpenseEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner)
  }
}
