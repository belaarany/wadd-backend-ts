import { Injectable } from "@nestjs/common"
import * as DataLoader from "dataloader"
import { NestDataLoader } from "nestjs-dataloader"
import { Income } from "src/interfaces/income.interface"
import { ExpenseMicroserviceIncomesService } from "src/microservices/expense/services/incomes.service"

@Injectable()
export class IncomesLoader implements NestDataLoader<string, Income> {
	constructor(private expenseMicroserviceIncomesService: ExpenseMicroserviceIncomesService) {}

	generateDataLoader(): DataLoader<string, Income> {
		return new DataLoader<string, Income>((incomeIds) =>
			this.expenseMicroserviceIncomesService.listIncomes(incomeIds as string[]),
		)
	}
}
