import { ExpenseEntity } from "src/domain/expenses/schemas/expense.entity"
import { IncomeEntity } from "src/domain/incomes/schemas/income.entity"
import { TransferEntity } from "src/domain/transfers/schemas/transfer.entity"
import { DataSource, ViewColumn, ViewEntity } from "typeorm"
import { WalletEntity } from "./wallet.entity"

@ViewEntity({
  name: "wallet_balances",
  expression: (connection: DataSource) => {
    return connection
      .createQueryBuilder()
      .select("wallets.id", "wallet_id")
      .addSelect("COALESCE(wallets.initial_balance, 0::numeric)", "initial_balance")
      .addSelect("COALESCE(incomes.total_amount, 0::numeric)", "total_incomes")
      .addSelect("COALESCE(expenses.total_amount, 0::numeric)", "total_expenses")
      .addSelect("COALESCE(incoming_transfers.total_amount, 0::numeric)", "total_incoming_transfers")
      .addSelect("COALESCE(outgoing_transfers.total_amount, 0::numeric)", "total_outgoing_transfers")
      .addSelect(
        `COALESCE(wallets.initial_balance, 0) + COALESCE(incomes.total_amount, 0) - COALESCE(expenses.total_amount, 0) + COALESCE(incoming_transfers.total_amount, 0) - COALESCE(outgoing_transfers.total_amount, 0)`,
        "balance",
      )
      .from(WalletEntity, "wallets")
      .leftJoin(
        (qb) =>
          qb
            .from(IncomeEntity, "incomes")
            .select("incomes.wallet_id", "wallet_id")
            .addSelect("SUM(incomes.amount)", "total_amount")
            .groupBy("incomes.wallet_id"),
        "incomes",
        "wallets.id = incomes.wallet_id",
      )
      .leftJoin(
        (qb) =>
          qb
            .from(ExpenseEntity, "expenses")
            .select("expenses.wallet_id", "wallet_id")
            .addSelect("SUM(expenses.amount)", "total_amount")
            .groupBy("expenses.wallet_id"),
        "expenses",
        "wallets.id = expenses.wallet_id",
      )
      .leftJoin(
        (qb) =>
          qb
            .from(TransferEntity, "transfers")
            .select("transfers.target_wallet_id", "target_wallet_id")
            .addSelect("SUM(transfers.amount)", "total_amount")
            .groupBy("transfers.target_wallet_id"),
        "incoming_transfers",
        "wallets.id = incoming_transfers.target_wallet_id",
      )
      .leftJoin(
        (qb) =>
          qb
            .from(TransferEntity, "transfers")
            .select("transfers.source_wallet_id", "source_wallet_id")
            .addSelect("SUM(transfers.amount)", "total_amount")
            .groupBy("transfers.source_wallet_id"),
        "outgoing_transfers",
        "wallets.id = outgoing_transfers.source_wallet_id",
      )
  },
})
export class WalletBalancesViewEntity {
  @ViewColumn()
  wallet_id: number

  @ViewColumn()
  initial_balance: number

  @ViewColumn()
  total_incomes: number

  @ViewColumn()
  total_expenses: number

  @ViewColumn()
  total_incoming_transfers: number

  @ViewColumn()
  total_outgoing_transfers: number

  @ViewColumn()
  balance: number
}
