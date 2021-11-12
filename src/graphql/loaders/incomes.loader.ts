import { Injectable } from "@nestjs/common"
import * as DataLoader from "dataloader"
import { NestDataLoader } from "nestjs-dataloader"
import { Income } from "src/interfaces/income.interface"
import { IncomesService } from "src/services/incomes/incomes.service"

@Injectable()
export class IncomesLoader implements NestDataLoader<string, Income> {
	constructor(private incomesService: IncomesService) {}

	generateDataLoader(): DataLoader<string, Income> {
		return new DataLoader<string, Income>((incomeIds) => this.incomesService.listByIds(incomeIds as string[]))
	}
}
