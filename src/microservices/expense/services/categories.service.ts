import { Inject, Injectable, Logger } from "@nestjs/common"
import { ClientProxy } from "@nestjs/microservices"
import { Category } from "src/interfaces/category.interface"
import { Expense } from "src/interfaces/expense.interface"
import { Income } from "src/interfaces/income.interface"
import { Wallet } from "src/interfaces/wallet.interface"
import { CreateCategoryDto, CreateExpenseDto, CreateIncomeDto, CreateTransferDto, CreateWalletDto } from "../expense.dto"

export class ExpenseMicroserviceCategoriesService {
  constructor(@Inject("EXPENSE_SERVICE") private client: ClientProxy) {}

  async createCategory(categoryData: CreateCategoryDto): Promise<Category> {
    const response = await this.client.send("categories.create-category", { category: categoryData }).toPromise()

    if (response.error) {
      Logger.error("Microservice replied with an error:")
      console.error(response)
      throw new Error("Microservice replied with an error")
    }

    return response
  }

  async listUserCategories(userId: string): Promise<Category[]> {
    const response = await this.client.send("categories.list-user-categories", { userId: userId }).toPromise()

    if (response.error) {
      Logger.error("Microservice replied with an error:")
      console.error(response)
      throw new Error("Microservice replied with an error")
    }

    return response
  }

  async listCategories(categoryIds: string[]): Promise<Category[]> {
    const response = await this.client.send("categories.list-categories", { categoryIds: categoryIds }).toPromise()

    if (response.error) {
      Logger.error("Microservice replied with an error:")
      console.error(response)
      throw new Error("Microservice replied with an error")
    }

    return response
  }
}
