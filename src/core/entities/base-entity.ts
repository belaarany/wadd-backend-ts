import { BeforeInsert, CreateDateColumn, DeleteDateColumn, PrimaryColumn, UpdateDateColumn } from "typeorm"
import { IdPrefix } from "../interfaces/enums/IdPrefix"
import { Kind } from "../interfaces/enums/Kind"
import { generateId } from "../utils/GenerateId"
import { Exclude } from "class-transformer"

export abstract class BaseEntity {
  @Exclude()
  readonly idPrefix: IdPrefix

  readonly kind: Kind

  @PrimaryColumn()
  id: string

  @CreateDateColumn({ nullable: true })
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @DeleteDateColumn()
  deleted_at: Date

  get is_deleted(): boolean {
    return !!this.deleted_at
  }

  @BeforeInsert()
  generateId() {
    this.id = generateId(this.idPrefix)
  }
}
