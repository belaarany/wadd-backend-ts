import { Currency } from "src/interfaces/enums/Currency"
import { WalletEntity } from "src/services/wallets/schemas/wallet.entity"
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm"

@Entity("transfers")
export class TransferEntity {
  @PrimaryColumn()
  id: string

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

  @Column({ type: "boolean" })
  is_deleted = false

  @Column()
  created_at: Date = null

  @Column({ nullable: true })
  updated_at: Date = null

  @Column({ nullable: true })
  deleted_at: Date = null
}
