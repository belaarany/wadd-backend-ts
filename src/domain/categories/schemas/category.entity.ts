import { Expose } from "class-transformer"
import { BaseEntity } from "src/core/entities/base-entity"
import { IdPrefix } from "src/core/interfaces/enums/IdPrefix"
import { Kind } from "src/core/interfaces/enums/Kind"
import { Column, Entity } from "typeorm"

@Entity("categories")
export class CategoryEntity extends BaseEntity {
  readonly idPrefix = IdPrefix.CATEGORY

  @Expose()
  readonly kind = Kind.CATEGORY

  @Column()
  owner_user_id: string

  @Column({ nullable: true })
  parent_category_id: string | null

  @Column()
  color: string

  @Column()
  icon: string

  @Column()
  name: string
}
