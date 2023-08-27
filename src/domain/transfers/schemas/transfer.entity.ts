import { BaseEntity } from "src/core/entities/base-entity"
import { Currency } from "src/core/interfaces/enums/Currency"
import { WalletEntity } from "src/domain/wallets/schemas/wallet.entity"
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm"

@Entity("transfers")
export class TransferEntity extends BaseEntity {
  @ManyToOne(() => WalletEntity, (wallet) => wallet.id, { lazy: true })
  @JoinColumn({ name: "source_wallet_id" })
  source_wallet: WalletEntity

  @Column()
  source_wallet_id: string

  @Column()
  source_amount: number

  @Column()
  source_currency: Currency

  @ManyToOne(() => WalletEntity, (wallet) => wallet.id, { lazy: true })
  @JoinColumn({ name: "target_wallet_id" })
  target_wallet: WalletEntity

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
}
