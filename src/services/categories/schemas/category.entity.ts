import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity("categories")
export class CategoryEntity {
  @PrimaryColumn()
  id: string

  @Column()
  owner_user_id: string

  @Column({ nullable: true })
  parent_category_id: string | null

  @Column()
  name: string

  @Column({ type: "boolean" })
  is_deleted = false

  @Column()
  created_at: Date = null

  @Column({ nullable: true })
  updated_at: Date = null

  @Column({ nullable: true })
  deleted_at: Date = null
}
