import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm"
import { Currency } from "../../../core/interfaces/enums/Currency"
import { WalletEntity } from "src/domain/wallets/schemas/wallet.entity"
import { CategoryEntity } from "src/domain/categories/schemas/category.entity"
import { BaseEntity } from "src/core/entities/base-entity"
import { IdPrefix } from "src/core/interfaces/enums/IdPrefix"
import { Expose } from "class-transformer"
import { Kind } from "src/core/interfaces/enums/Kind"

@Entity("expenses")
export class ExpenseEntity extends BaseEntity {
  readonly idPrefix = IdPrefix.EXPENSE

  @Expose()
  readonly kind = Kind.EXPENSE

  @ManyToOne(() => WalletEntity, (wallet) => wallet.id, { lazy: true })
  @JoinColumn({ name: "wallet_id" })
  wallet: WalletEntity

  @Column()
  wallet_id: string

  @Column({ type: "numeric" })
  amount: number

  @Column()
  currency: Currency

  @Column()
  timestamp: Date

  @Column({ nullable: true })
  location: string

  @Column({ type: "jsonb", nullable: true })
  related_income_ids: string[]

  @Column({ nullable: true })
  note: string

  @ManyToOne(() => CategoryEntity, (category) => category.id, { lazy: true })
  @JoinColumn({ name: "category_id" })
  category: CategoryEntity

  @Column()
  category_id: string

  @Column({ type: "jsonb", nullable: true })
  tags: string[]

  @Column({ nullable: true })
  group_id: string | null = null

  @Column({ type: "jsonb", nullable: true })
  attachment_file_ids: string[]

  @Column({ nullable: true })
  cancelled_at: Date = null

  get is_cancelled() {
    return !!this.cancelled_at
  }
}
