import { Inject, Injectable, Logger } from "@nestjs/common"
import { ClientProxy } from "@nestjs/microservices"
import { Category } from "src/interfaces/category.interface"
import { Expense } from "src/interfaces/expense.interface"
import { Income } from "src/interfaces/income.interface"
import { Wallet } from "src/interfaces/wallet.interface"
import { CreateCategoryDto, CreateExpenseDto, CreateIncomeDto, CreateTransferDto, CreateWalletDto } from "../expense.dto"

export class ExpenseMicroserviceWalletsService {
  constructor(@Inject("EXPENSE_SERVICE") private client: ClientProxy) {}

  async createWallet(walletData: CreateWalletDto): Promise<Wallet> {
    const response = await this.client.send("wallets.create-wallet", { wallet: walletData }).toPromise()

    if (response.error) {
      Logger.error("Microservice replied with an error:")
      console.error(response)
      throw new Error("Microservice replied with an error")
    }

    return response
  }

  async listUserWallets(userId: string): Promise<Wallet[]> {
    const response = await this.client.send("wallets.list-user-wallets", { userId: userId }).toPromise()

    if (response.error) {
      Logger.error("Microservice replied with an error:")
      console.error(response)
      throw new Error("Microservice replied with an error")
    }

    return response
  }

  async listWallets(walletIds: string[]): Promise<Wallet[]> {
    const response = await this.client.send("wallets.list-wallets", { walletIds: walletIds }).toPromise()

    if (response.error) {
      Logger.error("Microservice replied with an error:")
      console.error(response)
      throw new Error("Microservice replied with an error")
    }

    return response
  }

  async walletExists(walletId: string): Promise<boolean> {
    const response = await this.client.send("wallets.wallet-exists", { walletId: walletId }).toPromise()

    if (response.error) {
      Logger.error("Microservice replied with an error:")
      console.error(response)
      throw new Error("Microservice replied with an error")
    }

    return response
  }
}
