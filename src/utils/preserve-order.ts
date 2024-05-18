import { cloneDeep } from "lodash"

export const preserveOrder = <T>(keys: string[] | Readonly<string[]>, items: ({ id: string } & T)[]): T[] => {
  return cloneDeep(items).sort((a, b) => {
    return keys.indexOf(a.id) - keys.indexOf(b.id)
  })
}
