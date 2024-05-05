import * as Lodash from "lodash"
import { Currency } from "src/core/interfaces/enums/Currency"
import { WalletEntity } from "./wallet.entity"
import { faker } from "@faker-js/faker"
import { capitalize } from "lodash"
import { WalletType } from "src/core/interfaces/enums/WalletType"

export class WalletFactory {
  static make(walletPartialData: Partial<WalletEntity>): WalletEntity {
    const wallet = new WalletEntity()

    wallet.id = faker.string.uuid()
    wallet.name = capitalize(faker.lorem.word())
    wallet.owner_user_id = "N/A"
    wallet.order = faker.number.int(20)
    wallet.initial_balance = faker.number.int(100_000)
    wallet.default_currency = faker.helpers.arrayElement(Object.values(Currency))
    wallet.type = faker.helpers.arrayElement(Object.values(WalletType))
    wallet.color_hex = faker.internet.color()
    wallet.icon_url = faker.image.url()

    Lodash.forEach(walletPartialData, (value, key) => {
      wallet[key] = value
    })

    return wallet
  }
}
