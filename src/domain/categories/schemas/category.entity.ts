import { BaseEntity } from "src/core/entities/base-entity"
import { Column, Entity } from "typeorm"

@Entity("categories")
export class CategoryEntity extends BaseEntity {
  @Column()
  owner_user_id: string

  @Column({ nullable: true })
  parent_category_id: string | null

  @Column()
  name: string
}
