import { Wallet } from "../interfaces/wallet.model"
import { WalletEntity } from "./wallet.entity"
import * as _ from "lodash"

export class WalletMapper {
	static fromEntity(document: WalletEntity): Wallet {
		return {
			id: document.id,
			kind: "wallet",
			name: document.name,
			order: document.order,
			owner_user_id: document.owner_user_id,
			initial_balance: document.initial_balance,
			default_currency: document.default_currency,
			type: document.type,
			color_hex: document.color_hex || "",
			icon_url: document.icon_url || "",
			is_deleted: document.is_deleted,
			is_archived: document.is_archived,
			created_at: document.created_at,
			updated_at: document.updated_at,
			deleted_at: document.deleted_at,
			archived_at: document.archived_at,
		}
	}
}
