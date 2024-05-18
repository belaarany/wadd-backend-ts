import { registerAs } from "@nestjs/config"
import * as yup from "yup"

export type AppConfig = {
  env: "local" | "production"
  port: number
}

export default registerAs(
  "app",
  (): AppConfig => ({
    env: yup.string().oneOf(["local", "production"]).defined().label("APP_ENV").validateSync(process.env.APP_ENV),
    port: yup.number().defined().label("APP_PORT").validateSync(parseInt(process.env.APP_PORT, 10)),
  }),
)
