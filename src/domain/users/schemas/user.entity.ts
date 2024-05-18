import { Exclude, Expose } from "class-transformer"
import { BaseEntity } from "src/core/entities/base-entity"
import { IdPrefix } from "src/core/interfaces/enums/IdPrefix"
import { Kind } from "src/core/interfaces/enums/Kind"
import { Column, Entity } from "typeorm"

interface IEntity {
  idPrefix: IdPrefix
  kind: Kind
}

@Entity("users")
export class UserEntity extends BaseEntity implements IEntity {
  readonly idPrefix = IdPrefix.USER

  @Expose()
  readonly kind = Kind.USER

  @Column()
  email: string

  @Column()
  @Exclude()
  password: string
}
