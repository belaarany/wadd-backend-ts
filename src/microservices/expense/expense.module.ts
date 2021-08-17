import { Module } from "@nestjs/common"
import { ClientsModule, Transport } from "@nestjs/microservices"
import { ExpenseMicroserviceWalletsService } from "./services/wallets.service"
import { ExpenseMicroserviceIncomesService } from "./services/incomes.service"
import { ExpenseMicroserviceExpensesService } from "./services/expenses.service"
import { ExpenseMicroserviceBalancesService } from "./services/balances.service"
import { ExpenseMicroserviceTransfersService } from "./services/transfers.service"
import { ExpenseMicroserviceCategoriesService } from "./services/categories.service"

@Module({
	imports: [
		ClientsModule.register([
			{
				name: "EXPENSE_SERVICE",
				transport: Transport.RMQ,
				options: {
					urls: ["amqp://localhost:5672"],
					queue: "wadd_expense_queue",
					queueOptions: {
						durable: false,
					},
				},
				// transport: Transport.REDIS,
				// options: {
				// 	url: "redis://localhost:6379",
				// },
			},
		]),
	],
	providers: [
		ExpenseMicroserviceWalletsService,
		ExpenseMicroserviceIncomesService,
		ExpenseMicroserviceExpensesService,
		ExpenseMicroserviceBalancesService,
		ExpenseMicroserviceTransfersService,
		ExpenseMicroserviceCategoriesService,
	],
	exports: [
		ExpenseMicroserviceWalletsService,
		ExpenseMicroserviceIncomesService,
		ExpenseMicroserviceExpensesService,
		ExpenseMicroserviceBalancesService,
		ExpenseMicroserviceTransfersService,
		ExpenseMicroserviceCategoriesService,
	],
})
export class ExpenseMicroserviceModule {}
