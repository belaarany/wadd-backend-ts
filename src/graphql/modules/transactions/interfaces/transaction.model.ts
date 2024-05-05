import { createUnionType } from "@nestjs/graphql"
import { Kind } from "src/core/interfaces/enums/Kind"
import { ExpenseGQLModel } from "../../expenses/interfaces/expense.model"
import { IncomeGQLModel } from "../../incomes/interfaces/income.model"
import { TransferGQLModel } from "../../transfers/interfaces/transfer.model"

export const TransactionGQLUnion = createUnionType({
  name: "TransactionGQLUnion",
  types: () => [IncomeGQLModel, ExpenseGQLModel, TransferGQLModel] as const,
  resolveType(value) {
    if (value.kind === Kind.EXPENSE) {
      return ExpenseGQLModel
    }

    if (value.kind === Kind.INCOME) {
      return IncomeGQLModel
    }

    if (value.kind === Kind.TRANSFER) {
      return TransferGQLModel
    }

    return null
  },
})
