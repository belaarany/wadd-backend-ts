export type CreateCategoryDto = {
  owner_user_id: string
  parent_category_id: string
  name: string
  color: string
  icon: string
}

export type UpdateCategoryDto = {
  parent_category_id: string
  name: string
  color: string
  icon: string
}
