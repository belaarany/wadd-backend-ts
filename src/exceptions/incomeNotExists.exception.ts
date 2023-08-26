import { HttpException, HttpStatus } from "@nestjs/common"

export class IncomeNotExistsException extends HttpException {
  constructor(incomeId: string) {
    super(
      {
        status: HttpStatus.BAD_REQUEST,
        error: `The specified Income ${incomeId} doesn't exist.`,
      },
      HttpStatus.BAD_REQUEST,
    )
  }
}
