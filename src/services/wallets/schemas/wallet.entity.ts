import { Currency } from "src/interfaces/enums/Currency"
import { Column, Entity, ObjectIdColumn } from "typeorm"
import { WalletType } from "../interfaces/wallet.model"

@Entity("wallets")
export class WalletEntity {
  @ObjectIdColumn({ name: "_id" })
  _id: string

  @Column()
  id: string

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

  @Column({ type: "boolean" })
  is_deleted = false

  @Column({ type: "boolean" })
  is_archived = false

  @Column()
  created_at: Date

  @Column({ nullable: true })
  updated_at: Date = null

  @Column({ nullable: true })
  deleted_at: Date = null

  @Column({ nullable: true })
  archived_at: Date = null
}
