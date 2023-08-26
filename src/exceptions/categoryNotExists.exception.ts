import { HttpException, HttpStatus } from "@nestjs/common"

export class CategoryNotExistsException extends HttpException {
  constructor(categoryId: string) {
    super(
      {
        status: HttpStatus.BAD_REQUEST,
        error: `The specified Category ${categoryId} doesn't exist.`,
      },
      HttpStatus.BAD_REQUEST,
    )
  }
}
