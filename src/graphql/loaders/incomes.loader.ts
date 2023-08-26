import { Injectable } from "@nestjs/common"
import * as DataLoader from "dataloader"
import { NestDataLoader } from "nestjs-dataloader"
import { IncomesService } from "src/services/incomes/incomes.service"
import { Income } from "src/services/incomes/interfaces/income.model"

@Injectable()
export class IncomesLoader implements NestDataLoader<string, Income> {
  constructor(private incomesService: IncomesService) {}

  generateDataLoader(): DataLoader<string, Income> {
    return new DataLoader<string, Income>((incomeIds) => this.incomesService.listByIds(incomeIds as string[]))
  }
}
