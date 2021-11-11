import { UseGuards } from "@nestjs/common"
import { Args, Info, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql"
import { GraphQLResolveInfo } from "graphql"
import { Authorization, AuthUser } from "src/decorators/auth.decorator"
import { CategoryNotExistsException } from "src/exceptions/categoryNotExists.exception"
import { AuthGuard } from "src/guards/auth.guard"
import { Category } from "src/interfaces/category.interface"
import { Expense } from "src/interfaces/expense.interface"
import { Income } from "src/interfaces/income.interface"
import { Transfer } from "src/interfaces/transfer.interface"
import { ExpenseMicroserviceExpensesService } from "src/microservices/expense/services/expenses.service"
import { ExpenseMicroserviceIncomesService } from "src/microservices/expense/services/incomes.service"
import { ExpenseMicroserviceTransfersService } from "src/microservices/expense/services/transfers.service"
import { ExpenseMicroserviceWalletsService } from "src/microservices/expense/services/wallets.service"
import { LogMicroservice } from "src/microservices/log/log.service"
import { ExpenseMicroserviceCategoriesService } from "../../../microservices/expense/services/categories.service"
import { ExpenseGQLModel } from "../expenses/interfaces/expense.model"
import { IncomeGQLModel } from "../incomes/interfaces/income.model"
import { TransferGQLModel } from "../transfers/interfaces/transfer.model"
import { TransfersGQLModule } from "../transfers/transfers.module"
import { TransactionGQLModel } from "./interfaces/category.model"

@Resolver(() => TransactionGQLModel)
export class CategoriesResolver {
	constructor(
		private expenseMicroserviceIncomeService: ExpenseMicroserviceIncomesService,
		private expenseMicroserviceExpensesService: ExpenseMicroserviceExpensesService,
		private expanseMicroserviceTransfersService: ExpenseMicroserviceTransfersService,
	) {}

	@UseGuards(AuthGuard)
	@Query(() => TransactionGQLModel)
	async transactions(@Args("wallet_ids", { type: () => [String] }) walletIds: string[]): Promise<any> {
		return {
			kind: "transactions",
		}
	}

	@ResolveField(() => [IncomeGQLModel])
	async incomes(@Info() info: GraphQLResolveInfo): Promise<Income[]> {
		const incomes = await this.expenseMicroserviceIncomeService.listWalletIncomes(info.variableValues.wallet_ids)

		return incomes as Income[]
	}

	@ResolveField(() => [ExpenseGQLModel])
	async expenses(@Info() info: GraphQLResolveInfo): Promise<Expense[]> {
		const expenses = await this.expenseMicroserviceExpensesService.listWalletExpenses(
			info.variableValues.wallet_ids,
		)

		return expenses as Expense[]
	}

	@ResolveField(() => [TransferGQLModel])
	async transfers(@Info() info: GraphQLResolveInfo): Promise<Transfer[]> {
		const transfers = await this.expanseMicroserviceTransfersService.listWalletTransfers(
			info.variableValues.wallet_ids,
		)

		return transfers as Transfer[]
	}
}
