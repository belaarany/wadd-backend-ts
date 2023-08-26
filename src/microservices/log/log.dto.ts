export type CreateLogDTO = {
  scope: string
  action: string
  user_id?: string | null
  target_id?: string | null
  platform?: Record<string, unknown> | null
  data?: Record<string, unknown>
}
