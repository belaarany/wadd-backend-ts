import { HttpException, HttpStatus } from "@nestjs/common"

export class ExpenseNotExistsException extends HttpException {
  constructor(expenseId: string) {
    super(
      {
        status: HttpStatus.BAD_REQUEST,
        error: `The specified Expense ${expenseId} doesn't exist.`,
      },
      HttpStatus.BAD_REQUEST,
    )
  }
}
