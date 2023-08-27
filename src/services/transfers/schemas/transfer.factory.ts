import * as Lodash from "lodash"
import { generateId } from "../../../utils/GenerateId"
import { IdPrefix } from "../../../interfaces/enums/IdPrefix"
import { TransferEntity } from "./transfer.entity"

export class TransferFactory {
  static make(transferPartialData: Partial<TransferEntity>): TransferEntity {
    const transfer = new TransferEntity()

    transfer.id = generateId(IdPrefix.TRANSFER)
    transfer.source_wallet_id = null
    transfer.source_amount = 0
    transfer.source_currency = null
    transfer.target_wallet_id = null
    transfer.target_amount = 0
    transfer.target_currency = null
    transfer.timestamp = null
    transfer.note = ""
    transfer.created_at = null
    transfer.updated_at = null
    transfer.deleted_at = null

    Lodash.forEach(transferPartialData, (value, key) => {
      transfer[key] = value
    })

    return transfer
  }
}
