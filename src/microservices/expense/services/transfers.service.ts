import { Inject, Logger } from "@nestjs/common"
import { ClientProxy } from "@nestjs/microservices"
import { Transfer } from "src/services/transfers/interfaces/transfer.model"
import { CreateTransferDto } from "../expense.dto"

export class ExpenseMicroserviceTransfersService {
  constructor(@Inject("EXPENSE_SERVICE") private client: ClientProxy) {}

  async createTransfer(transferData: CreateTransferDto): Promise<Transfer> {
    const response = await this.client.send("transfers.create-transfer", { transfer: transferData }).toPromise()

    if (response.error) {
      Logger.error("Microservice replied with an error:")
      console.error(response)
      throw new Error("Microservice replied with an error")
    }

    return response
  }

  async listWalletTransfers(walletIds: string[]): Promise<Transfer[]> {
    const response = await this.client.send("transfers.list-wallet-transfers", { walletIds: walletIds }).toPromise()

    if (response.error) {
      Logger.error("Microservice replied with an error:")
      console.error(response)
      throw new Error("Microservice replied with an error")
    }

    return response
  }

  async transferExists(transferId: string): Promise<boolean> {
    const response = await this.client.send("transfers.transfer-exists", { transferId: transferId }).toPromise()

    if (response.error) {
      Logger.error("Microservice replied with an error:")
      console.error(response)
      throw new Error("Microservice replied with an error")
    }

    return response
  }
}
