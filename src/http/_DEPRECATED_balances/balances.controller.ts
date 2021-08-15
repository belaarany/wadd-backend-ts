import { Body, Controller, Get, Query } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { ExpenseMicroservice } from "src/microservices/expense/expense.service"
import { LogMicroservice } from "src/microservices/log/log.service"

@ApiTags("Balances")
@Controller("balances")
export class BalancesController {
	constructor(private expenseMicroservice: ExpenseMicroservice, private logMicroservice: LogMicroservice) {}

	@Get()
	async getBalances(@Query() query) {
		return {
			kind: "balance",
			available: await this.expenseMicroservice.getIncomesSummary(query.wallet_id),
		}
	}
}
