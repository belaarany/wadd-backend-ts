import { HttpException, HttpStatus } from "@nestjs/common"

export class InvalidCredentialsException extends HttpException {
  constructor() {
    super(
      {
        status: HttpStatus.NOT_FOUND,
        error: "Invalid credentials",
      },
      HttpStatus.NOT_FOUND,
    )
  }
}
