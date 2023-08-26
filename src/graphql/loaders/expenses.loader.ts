import { Injectable } from "@nestjs/common"
import * as DataLoader from "dataloader"
import { NestDataLoader } from "nestjs-dataloader"
import { ExpensesService } from "src/services/expenses/expenses.service"
import { Expense } from "src/services/expenses/interfaces/expense.model"
import { ExpenseMicroserviceExpensesService } from "../../microservices/expense/services/expenses.service"

@Injectable()
export class ExpensesLoader implements NestDataLoader<string, Expense> {
  constructor(private expensesService: ExpensesService) {}

  generateDataLoader(): DataLoader<string, Expense> {
    return new DataLoader<string, Expense>((expenseIds) => this.expensesService.listByIds(expenseIds as string[]))
  }
}
