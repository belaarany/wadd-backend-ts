import { UseGuards } from "@nestjs/common"
import { Args, Info, Query, ResolveField, Resolver } from "@nestjs/graphql"
import { GraphQLResolveInfo } from "graphql"
import { AuthGuard } from "src/guards/auth.guard"
import { Expense } from "src/interfaces/expense.interface"
import { Income } from "src/interfaces/income.interface"
import { Transfer } from "src/interfaces/transfer.interface"
import { ExpensesService } from "src/services/expenses/expenses.service"
import { IncomesService } from "src/services/incomes/incomes.service"
import { TransfersService } from "src/services/transfers/transfers.service"
import { ExpenseGQLModel } from "../expenses/interfaces/expense.model"
import { IncomeGQLModel } from "../incomes/interfaces/income.model"
import { TransferGQLModel } from "../transfers/interfaces/transfer.model"
import { TransactionGQLModel } from "./interfaces/category.model"

@Resolver(() => TransactionGQLModel)
export class CategoriesResolver {
	constructor(
		private expensesService: ExpensesService,
		private transfersService: TransfersService,
		private incomesService: IncomesService,
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
		const incomes = await this.incomesService.listByWalletIds(info.variableValues.wallet_ids)

		return incomes as Income[]
	}

	@ResolveField(() => [ExpenseGQLModel])
	async expenses(@Info() info: GraphQLResolveInfo): Promise<Expense[]> {
		const expenses = await this.expensesService.listByWalletIds(info.variableValues.wallet_ids)

		return expenses as Expense[]
	}

	@ResolveField(() => [TransferGQLModel])
	async transfers(@Info() info: GraphQLResolveInfo): Promise<Transfer[]> {
		const transfers = await this.transfersService.listByWalletIds(info.variableValues.wallet_ids)

		return transfers as Transfer[]
	}
}
