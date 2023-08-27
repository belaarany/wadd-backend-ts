import { Injectable } from "@nestjs/common"
import * as DataLoader from "dataloader"
import { INestDataLoader, NestDataLoader } from "src/core/utils/data-loader"
import { ExpensesService } from "src/domain/expenses/expenses.service"
import { Expense } from "src/domain/expenses/interfaces/expense.model"

@Injectable()
export class ExpensesLoader extends NestDataLoader<Expense> implements INestDataLoader<Expense> {
  constructor(private expensesService: ExpensesService) {
    super()

    this.dataLoader = this.generateDataLoader()
  }

  generateDataLoader(): DataLoader<string, Expense> {
    return new DataLoader<string, Expense>((expenseIds) => this.expensesService.listByIds(expenseIds as string[]))
  }
}
