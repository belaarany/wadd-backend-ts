import { BaseEntity } from "src/core/entities/base-entity"
import { CategoryEntity } from "src/domain/categories/schemas/category.entity"
import { WalletEntity } from "src/domain/wallets/schemas/wallet.entity"
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm"
import { Currency } from "../../../core/interfaces/enums/Currency"
import { IdPrefix } from "src/core/interfaces/enums/IdPrefix"
import { Expose } from "class-transformer"
import { Kind } from "src/core/interfaces/enums/Kind"

@Entity("incomes")
export class IncomeEntity extends BaseEntity {
  readonly idPrefix = IdPrefix.INCOME

  @Expose()
  readonly kind = Kind.INCOME

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
  related_expense_ids: string[]

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
