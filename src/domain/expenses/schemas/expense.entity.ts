import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm"
import { Currency } from "../../../core/interfaces/enums/Currency"
import { WalletEntity } from "src/domain/wallets/schemas/wallet.entity"
import { CategoryEntity } from "src/domain/categories/schemas/category.entity"
import { BaseEntity } from "src/core/entities/base-entity"

@Entity("expense")
export class ExpenseEntity extends BaseEntity {
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
  related_income_ids: string[]

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

  @Column({ nullable: true })
  cancelled_at: Date = null

  get is_cancelled() {
    return !!this.cancelled_at
  }
}
