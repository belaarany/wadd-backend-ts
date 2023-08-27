import { BaseEntity } from "src/core/entities/base-entity"
import { Currency } from "src/interfaces/enums/Currency"
import { Column, Entity } from "typeorm"
import { WalletType } from "../interfaces/wallet.model"

@Entity("wallets")
export class WalletEntity extends BaseEntity {
  @Column()
  name: string

  @Column()
  order: number

  @Column()
  owner_user_id: string

  @Column()
  initial_balance: number

  @Column()
  default_currency: Currency

  @Column()
  type: WalletType

  @Column()
  color_hex: string

  @Column()
  icon_url: string

  @Column({ nullable: true })
  archived_at: Date = null

  get is_archived() {
    return !!this.archived_at
  }
}
