import { Inject, Injectable, Logger } from "@nestjs/common"
import { ClientProxy } from "@nestjs/microservices"
import { Category } from "src/interfaces/category.interface"
import { Expense } from "src/interfaces/expense.interface"
import { Income } from "src/interfaces/income.interface"
import { Wallet } from "src/interfaces/wallet.interface"
import { CreateCategoryDto, CreateExpenseDto, CreateIncomeDto, CreateTransferDto, CreateWalletDto } from "../expense.dto"

export class ExpenseMicroserviceTransfersService {
  constructor(@Inject("EXPENSE_SERVICE") private client: ClientProxy) {}

  async createTransfer(transferData: CreateTransferDto): Promise<Income> {
    const response = await this.client.send("transfers.create-transfer", { transfer: transferData }).toPromise()

    if (response.error) {
      Logger.error("Microservice replied with an error:")
      console.error(response)
      throw new Error("Microservice replied with an error")
    }

    return response
  }

  async listWalletTransfers(walletIds: string[]): Promise<Income[]> {
    const response = await this.client.send("transfers.list-wallet-transfers", { walletIds: walletIds }).toPromise()

    if (response.error) {
      Logger.error("Microservice replied with an error:")
      console.error(response)
      throw new Error("Microservice replied with an error")
    }

    return response
  }
}
