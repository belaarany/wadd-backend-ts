import { CreateDateColumn, DeleteDateColumn, PrimaryColumn, UpdateDateColumn } from "typeorm"

export abstract class BaseEntity {
  @PrimaryColumn()
  id: string = ""

  @CreateDateColumn({ nullable: true })
  created_at: Date = null

  @UpdateDateColumn({ nullable: true })
  updated_at: Date = null

  @DeleteDateColumn({ nullable: true })
  deleted_at: Date = null

  get is_deleted(): boolean {
    return !!this.deleted_at
  }
}
