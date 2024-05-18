import { registerAs } from "@nestjs/config"
import * as yup from "yup"

export type DatabaseConfig = {
  host: string
  port: number
  username: string
  password: string
  database: string
}

export default registerAs("database", () => ({
  host: yup.string().defined().label("DATABASE_HOST").label("DATABASE_HOST").validateSync(process.env.DATABASE_HOST),
  port: yup.number().defined().label("DATABASE_PORT").validateSync(parseInt(process.env.DATABASE_PORT, 10)),
  username: yup.string().defined().label("DATABASE_USERNAME").validateSync(process.env.DATABASE_USERNAME),
  password: yup.string().defined().label("DATABASE_PASSWORD").validateSync(process.env.DATABASE_PASSWORD),
  database: yup.string().defined().label("DATABASE_DB").validateSync(process.env.DATABASE_DB),
}))
