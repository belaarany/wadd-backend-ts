import { Controller } from "@nestjs/common"
import { IncomesService } from "../incomes/incomes.service"

@Controller()
export class BalancesController {
  constructor(private readonly incomesService: IncomesService) {}

  async getBalances(data: any): Promise<any> {
    const incomesSummary = await this.incomesService.getSummary(data.walletIds)

    return incomesSummary["income"]
  }
}
