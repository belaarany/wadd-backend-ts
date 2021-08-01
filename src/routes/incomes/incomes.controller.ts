import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common"
import { ApiOperation, ApiTags } from "@nestjs/swagger"
import { Authorization, AuthUser } from "src/decorators/auth.decorator"
import { AuthGuard } from "src/guards/auth.guard"
import { ExpenseMicroservice } from "src/microservices/expense/expense.service"
import { LogMicroservice } from "src/microservices/log/log.service"
import { CreateIncomeHttpRequest, ListWalletIncomesHttpRequest } from "./interfaces/incomes.requests"

@ApiTags("Incomes")
@Controller("incomes")
export class IncomesController {
	constructor(private expenseMicroservice: ExpenseMicroservice, private logMicroservice: LogMicroservice) {}

	@Post()
	@UseGuards(AuthGuard)
	@ApiOperation({ summary: "Creates a new Income." })
	// TODO: Missing return type
	async createIncome(@Authorization() authUser: AuthUser, @Body() body: CreateIncomeHttpRequest): Promise<any> {
		const income = await this.expenseMicroservice.createIncome(body)

		this.logMicroservice.createLog({
			scope: "user",
			action: "income.create",
			user_id: authUser.id,
			target_id: income.id,
			platform: null,
			data: {
				income: income,
			},
		})

		return income
	}

	@Get()
	@UseGuards(AuthGuard)
	@ApiOperation({ summary: "Lists the Incomes of a Wallet." })
	// TODO: Missing return type
	async listWalletIncomes(@Query() query: ListWalletIncomesHttpRequest): Promise<any> {
		const incomes = await this.expenseMicroservice.listWalletIncomes(query.walletId)

		return incomes
	}
}
