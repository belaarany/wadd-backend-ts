import { registerAs } from "@nestjs/config"
import * as yup from "yup"

export type JwtConfig = {
  secret: string
  expiresIn: string
}

export default registerAs("jwt", () => ({
  secret: yup.string().length(256).defined().label("JWT_SECRET").validateSync(process.env.JWT_SECRET),
  expiresIn: yup.string().defined().label("JWT_EXPIRES_IN").validateSync(process.env.JWT_EXPIRES_IN),
}))
