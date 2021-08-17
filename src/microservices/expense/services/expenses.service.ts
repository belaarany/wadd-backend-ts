import { Inject, Injectable, Logger } from "@nestjs/common"
import { ClientProxy } from "@nestjs/microservices"
import { Category } from "src/interfaces/category.interface"
import { Expense } from "src/interfaces/expense.interface"
import { Income } from "src/interfaces/income.interface"
import { Wallet } from "src/interfaces/wallet.interface"
import { CreateCategoryDto, CreateExpenseDto, CreateIncomeDto, CreateTransferDto, CreateWalletDto } from "../expense.dto"

export class ExpenseMicroserviceExpensesService {
  constructor(@Inject("EXPENSE_SERVICE") private client: ClientProxy) {}

  async listExpenses(expenseIds: string[]): Promise<Expense[]> {
    const response = await this.client.send("expenses.list-expenses", { expenseIds: expenseIds }).toPromise()

    if (response.error) {
      Logger.error("Microservice replied with an error:")
      console.error(response)
      throw new Error("Microservice replied with an error")
    }

    return response
  }

  async createExpense(expenseData: CreateExpenseDto): Promise<Expense> {
    const response = await this.client.send("expenses.create-expense", { expense: expenseData }).toPromise()

    if (response.error) {
      Logger.error("Microservice replied with an error:")
      console.error(response)
      throw new Error("Microservice replied with an error")
    }

    return response
  }

  async listWalletExpenses(walletIds: string[]): Promise<Expense[]> {
    const response = await this.client.send("expenses.list-wallet-expenses", { walletIds: walletIds }).toPromise()

    if (response.error) {
      Logger.error("Microservice replied with an error:")
      console.error(response)
      throw new Error("Microservice replied with an error")
    }

    return response
  }
}