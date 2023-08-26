import { Column, Entity, ObjectIdColumn } from "typeorm"
import { Currency } from "../../../interfaces/enums/Currency"

@Entity("incomes")
export class IncomeEntity {
  @ObjectIdColumn({ name: "_id" })
  _id: string

  @Column()
  id: string

  @Column()
  wallet_id: string

  @Column()
  amount: number

  @Column()
  currency: Currency

  @Column()
  timestamp: Date

  @Column()
  location: string

  @Column()
  related_expense_ids: string[]

  @Column()
  note: string

  @Column()
  category_id: string

  @Column()
  tags: string[]

  @Column({ nullable: true })
  group_id: string | null = null

  @Column()
  attachment_file_ids: string[]

  @Column({ type: "boolean" })
  is_deleted = false

  @Column({ type: "boolean" })
  is_cancelled = false

  @Column()
  created_at: Date

  @Column({ nullable: true })
  updated_at: Date = null

  @Column({ nullable: true })
  deleted_at: Date = null

  @Column({ nullable: true })
  cancelled_at: Date = null
}
