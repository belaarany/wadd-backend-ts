import { Currency } from "src/interfaces/enums/Currency"
import { Column, Entity, ObjectIdColumn } from "typeorm"

@Entity("transfers")
export class TransferEntity {
  @ObjectIdColumn({ name: "_id" })
  _id: string

  @Column()
  id: string

  @Column()
  source_wallet_id: string

  @Column()
  source_amount: number

  @Column()
  source_currency: Currency

  @Column()
  target_wallet_id: string

  @Column()
  target_amount: number

  @Column()
  target_currency: Currency

  @Column()
  timestamp: Date

  @Column()
  note: string

  @Column({ type: "boolean" })
  is_deleted = false

  @Column()
  created_at: Date = null

  @Column({ nullable: true })
  updated_at: Date = null

  @Column({ nullable: true })
  deleted_at: Date = null
}
