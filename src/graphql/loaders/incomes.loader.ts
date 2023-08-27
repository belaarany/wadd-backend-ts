import { Injectable } from "@nestjs/common"
import * as DataLoader from "dataloader"
import { INestDataLoader, NestDataLoader } from "src/core/utils/data-loader"
import { IncomesService } from "src/domain/incomes/incomes.service"
import { Income } from "src/domain/incomes/interfaces/income.model"

@Injectable()
export class IncomesLoader extends NestDataLoader<Income> implements INestDataLoader<Income> {
  constructor(private incomesService: IncomesService) {
    super()

    this.dataLoader = this.generateDataLoader()
  }

  generateDataLoader(): DataLoader<string, Income> {
    return new DataLoader<string, Income>((incomeIds) => this.incomesService.listByIds(incomeIds as string[]))
  }
}
