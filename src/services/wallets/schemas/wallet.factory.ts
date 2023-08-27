import * as Lodash from "lodash"
import { generateId } from "../../../utils/GenerateId"
import { IdPrefix } from "../../../interfaces/enums/IdPrefix"
import { WalletType } from "../interfaces/wallet.model"
import { WalletEntity } from "./wallet.entity"
import { Currency } from "src/interfaces/enums/Currency"

export class WalletFactory {
  static make(walletPartialData: Partial<WalletEntity>): WalletEntity {
    const wallet = new WalletEntity()

    wallet.id = generateId(IdPrefix.WALLET)
    wallet.name = "N/A"
    wallet.owner_user_id = "N/A"
    wallet.order = 0
    wallet.initial_balance = 0
    wallet.default_currency = Currency.HUF
    wallet.type = WalletType.CASH
    wallet.color_hex = "000000"
    wallet.icon_url = ""
    wallet.created_at = null
    wallet.updated_at = null
    wallet.archived_at = null
    wallet.deleted_at = null

    Lodash.forEach(walletPartialData, (value, key) => {
      wallet[key] = value
    })

    return wallet
  }
}
