import { INestApplication } from "@nestjs/common"
import { Test, TestingModule } from "@nestjs/testing"
import { gql } from "apollo-boost"
import { print } from "graphql"
import { Wallet } from "../src/core/interfaces/wallet.interface"
import * as request from "supertest"
import { AppModule } from "./../src/app.module"
import { format } from "pretty-format"
import * as prettyjson from "prettyjson"

describe("Application flow (e2e)", () => {
	let app: INestApplication
	let response: request.Response

	let userId: string = "usr_d_YBn3" + Date.now()
	let walletId_1: string
	let walletId_2: string
	let categoryId_1: string
	let categoryId_2: string
	let categoryId_3: string
	let incomeId_1: string
	let expenseId_1: string

	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile()

		app = moduleFixture.createNestApplication()
		await app.init()
	})

	afterAll(async () => {
		await app.close()
	})

	it("Create Wallet", async () => {
		response = await request(app.getHttpServer())
			.post("/graphql")
			.set("Authorization", `Bearer ${userId}`)
			.send({
				query: print(gql`
					mutation {
						createWallet(
							data: {
								name: "OTP"
								order: 1
								initial_balance: 100
								default_currency: "HUF"
								type: "CASH"
								icon_file_id: null
							}
						) {
							id
						}
					}
				`),
			})
			.expect(200)

		walletId_1 = response.body.data.createWallet.id

		response = await request(app.getHttpServer())
			.post("/graphql")
			.set("Authorization", `Bearer ${userId}`)
			.send({
				query: print(gql`
					mutation {
						createWallet(
							data: {
								name: "Revolut"
								order: 1
								initial_balance: 0
								default_currency: "HUF"
								type: "CREDIT_CARD"
								icon_file_id: null
							}
						) {
							id
						}
					}
				`),
			})
			.expect(200)

		walletId_2 = response.body.data.createWallet.id
	})

	it("List Wallet", async () => {
		response = await request(app.getHttpServer())
			.post("/graphql")
			.set("Authorization", `Bearer ${userId}`)
			.send({
				query: print(gql`
					fragment walletFields on WalletGQLModel {
						id
						kind
						name
						order
						owner_user_id
						initial_balance
						default_currency
						type
						icon_file_id
						is_deleted
						is_archived
						created_at
						updated_at
						deleted_at
						archived_at
					}

					query wallets {
						wallets {
							...walletFields
						}
					}
				`),
				variables: {},
			})
			.expect(200)

		console.log(prettyjson.render(response.body))
	})

	it("Create Category", async () => {
		response = await request(app.getHttpServer())
			.post("/graphql")
			.set("Authorization", `Bearer ${userId}`)
			.send({
				query: print(gql`
					mutation createCategory($category: CreateCategoryGQLInput!) {
						createCategory(data: $category) {
							id
						}
					}
				`),
				variables: {
					category: {
						parent_category_id: null,
						name: "Subscriptions",
					},
				},
			})
			.expect(200)

		categoryId_1 = response.body.data.createCategory.id

		response = await request(app.getHttpServer())
			.post("/graphql")
			.set("Authorization", `Bearer ${userId}`)
			.send({
				query: print(gql`
					mutation createCategory($category: CreateCategoryGQLInput!) {
						createCategory(data: $category) {
							id
							parent_category_id
						}
					}
				`),
				variables: {
					category: {
						parent_category_id: categoryId_1,
						name: "Spotify",
					},
				},
			})
			.expect(200)

		categoryId_2 = response.body.data.createCategory.id

		response = await request(app.getHttpServer())
			.post("/graphql")
			.set("Authorization", `Bearer ${userId}`)
			.send({
				query: print(gql`
					mutation createCategory($category: CreateCategoryGQLInput!) {
						createCategory(data: $category) {
							id
							parent_category_id
						}
					}
				`),
				variables: {
					category: {
						parent_category_id: null,
						name: "Food",
					},
				},
			})
			.expect(200)

		categoryId_3 = response.body.data.createCategory.id
	})

	it("List Category", async () => {
		response = await request(app.getHttpServer())
			.post("/graphql")
			.set("Authorization", `Bearer ${userId}`)
			.send({
				query: print(gql`
					query categories {
						categories {
							id
							name
							parent_category_id
						}
					}
				`),
				variables: {},
			})
			.expect(200)

		console.log(prettyjson.render(response.body))
	})

	it("Create Income", async () => {
		response = await request(app.getHttpServer())
			.post("/graphql")
			.set("Authorization", `Bearer ${userId}`)
			.send({
				query: print(gql`
					mutation createWallet($income: CreateIncomeGQLInput!) {
						createIncome(data: $income) {
							id
						}
					}
				`),
				variables: {
					income: {
						wallet_id: walletId_1,
						amount: 140,
						currency: "HUF",
						timestamp: "2021-08-01T11:07:52.579Z",
						location: "Treutel - Rippin",
						related_expense_ids: [],
						note: "Kóla",
						category_id: categoryId_3,
						tags: [],
						group_id: null,
						attachment_file_ids: [],
					},
				},
			})
			.expect(200)

		incomeId_1 = response.body.data.createIncome.id
	})

	it("Create Expense", async () => {
		response = await request(app.getHttpServer())
			.post("/graphql")
			.set("Authorization", `Bearer ${userId}`)
			.send({
				query: print(gql`
					mutation createExpense($expense: CreateExpenseGQLInput!) {
						createExpense(data: $expense) {
							id
						}
					}
				`),
				variables: {
					expense: {
						wallet_id: walletId_1,
						amount: 200,
						currency: "HUF",
						timestamp: "2021-08-01T11:07:52.579Z",
						location: "Treutel - Rippin",
						related_income_ids: [incomeId_1],
						note: "Ez az kólás income-hoz kapcsolódik",
						category_id: categoryId_2,
						tags: [],
						group_id: null,
						attachment_file_ids: [],
					},
				},
			})
			.expect(200)

		expenseId_1 = response.body.data.createExpense.id
	})

	it("List Expense", async () => {
		response = await request(app.getHttpServer())
			.post("/graphql")
			.set("Authorization", `Bearer ${userId}`)
			.send({
				query: print(gql`
					query expenses($wallet_ids: [String!]!) {
						expenses(wallet_ids: $wallet_ids) {
							id
							amount
							currency
							wallet {
								id
								name
							}
							category {
								id
								name
							}
							related_incomes {
								id
								amount
							}
						}
					}
				`),
				variables: {
					wallet_ids: [walletId_1],
				},
			})
			.expect(200)

		console.log(prettyjson.render(response.body))
	})

	it("List Income", async () => {
		response = await request(app.getHttpServer())
			.post("/graphql")
			.set("Authorization", `Bearer ${userId}`)
			.send({
				query: print(gql`
					query incomes($wallet_ids: [String!]!) {
						incomes(wallet_ids: $wallet_ids) {
							id
							amount
							currency
							wallet {
								id
								name
							}
							category {
								id
								name
							}
							related_expenses {
								id
								amount
							}
						}
					}
				`),
				variables: {
					wallet_ids: [walletId_1],
				},
			})
			.expect(200)

		console.log(prettyjson.render(response.body))
	})
})
