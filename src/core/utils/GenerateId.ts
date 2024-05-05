import { customAlphabet } from "nanoid"
import { IdPrefix } from "../interfaces/enums/IdPrefix"

const nanoid = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", 21)

export function generateId(prefix: IdPrefix): string {
  const randomString = nanoid()
  const isTest = (process.env.NODE_ENV && process.env.NODE_ENV === "test") || false
  const isDev = (process.env.NODE_ENV && process.env.NODE_ENV === "dev") || false

  return `${prefix}${isTest ? "_t" : ""}${isDev ? "_d" : ""}_${randomString}`
}
