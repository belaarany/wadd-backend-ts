import * as Faker from "faker"
import { IdPrefix } from "../interfaces/enums/IdPrefix"

export function generateId(prefix: IdPrefix): string {
  const randomString = _generateIdPostfix()
  const isTest = (process.env.NODE_ENV && process.env.NODE_ENV === "test") || false
  const isDev = (process.env.NODE_ENV && process.env.NODE_ENV === "dev") || false

  return `${prefix}${isTest ? "_t" : ""}${isDev ? "_d" : ""}_${randomString}`
}

function _generateIdPostfix(): string {
  const length = 15 + Faker.datatype.number(5)
  let result = ""
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}
