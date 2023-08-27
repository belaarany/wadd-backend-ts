import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm"
import { Currency } from "../../../interfaces/enums/Currency"
import { WalletEntity } from "src/services/wallets/schemas/wallet.entity"
import { CategoryEntity } from "src/services/categories/schemas/category.entity"

@Entity("incomes")
export class IncomeEntity {
  @PrimaryColumn()
  id: string

  @ManyToOne(() => WalletEntity, (wallet) => wallet.id, { lazy: true })
  @JoinColumn({ name: "wallet_id" })
  wallet: WalletEntity

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

  @Column({ type: "jsonb" })
  related_expense_ids: string[]

  @Column()
  note: string

  @ManyToOne(() => CategoryEntity, (category) => category.id, { lazy: true })
  @JoinColumn({ name: "category_id" })
  category: CategoryEntity

  @Column()
  category_id: string

  @Column({ type: "jsonb" })
  tags: string[]

  @Column({ nullable: true })
  group_id: string | null = null

  @Column({ type: "jsonb" })
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
