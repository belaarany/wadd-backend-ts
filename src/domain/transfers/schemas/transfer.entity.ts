import { Expose } from "class-transformer"
import { BaseEntity } from "src/core/entities/base-entity"
import { Currency } from "src/core/interfaces/enums/Currency"
import { IdPrefix } from "src/core/interfaces/enums/IdPrefix"
import { Kind } from "src/core/interfaces/enums/Kind"
import { WalletEntity } from "src/domain/wallets/schemas/wallet.entity"
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm"

@Entity("transfers")
export class TransferEntity extends BaseEntity {
  readonly idPrefix = IdPrefix.TRANSFER

  @Expose()
  readonly kind = Kind.TRANSFER

  @ManyToOne(() => WalletEntity, (wallet) => wallet.id, { lazy: true })
  @JoinColumn({ name: "source_wallet_id" })
  source_wallet: WalletEntity

  @Column()
  source_wallet_id: string

  @ManyToOne(() => WalletEntity, (wallet) => wallet.id, { lazy: true })
  @JoinColumn({ name: "target_wallet_id" })
  target_wallet: WalletEntity

  @Column()
  target_wallet_id: string

  @Column({ type: "numeric" })
  amount: number

  @Column()
  timestamp: Date

  @Column({ nullable: true })
  note: string
}
