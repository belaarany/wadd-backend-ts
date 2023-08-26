import { Controller } from "@nestjs/common"
import { MessagePattern, Payload } from "@nestjs/microservices"
import { IncomesService } from "../incomes/incomes.service"

@Controller()
export class BalancesController {
  constructor(private readonly incomesService: IncomesService) {}

  @MessagePattern("balances.get-balances")
  async getBalances(@Payload() data: any): Promise<any> {
    const incomesSummary = await this.incomesService.getSummary(data.walletIds)

    return incomesSummary["income"]
  }
}
