export type Wallet = {
	readonly id: string,
	readonly kind: string,
	name: string,
	order: number,
	owner_id: string,
	initial_balance: number,
	is_deleted: boolean,
	is_archived: boolean,
	created_at: string,
	updated_at: string,
	deleted_at: string,
	archived_at: string,
}
