import { Expose } from "class-transformer"
import { BaseEntity } from "src/core/entities/base-entity"
import { Currency } from "src/core/interfaces/enums/Currency"
import { IdPrefix } from "src/core/interfaces/enums/IdPrefix"
import { Kind } from "src/core/interfaces/enums/Kind"
import { WalletType } from "src/core/interfaces/enums/WalletType"
import { Column, Entity } from "typeorm"

interface IEntity {
  idPrefix: IdPrefix
  kind: Kind
}

@Entity("wallets")
export class WalletEntity extends BaseEntity implements IEntity {
  readonly idPrefix = IdPrefix.WALLET

  @Expose()
  readonly kind = Kind.WALLET

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

  @Column({ nullable: true })
  archived_at: Date = null

  get is_archived() {
    return !!this.archived_at
  }
}
