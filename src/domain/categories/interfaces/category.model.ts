export type Category = {
  readonly id: string
  readonly kind: string
  owner_user_id: string
  parent_category_id: string
  name: string
  color: string
  icon: string
  is_deleted: boolean
  created_at: Date
  updated_at: Date
  deleted_at: Date
}
