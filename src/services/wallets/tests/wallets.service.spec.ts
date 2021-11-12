import { EntityNotFoundException } from "src/errors/entity.errors"
import { Currency } from "src/interfaces/enums/Currency"
import { createConnection, getConnection, getRepository, Repository } from "typeorm"
import { Wallet, WalletType } from "../interfaces/wallet.model"
import { WalletEntity } from "../schemas/wallet.entity"
import { WalletsRepository } from "../wallets.repository"
import { WalletsService } from "../wallets.service"
import { mockWallet, mockWalletPartial } from "./wallet.mock"

describe("WalletsService", () => {
	let service: WalletsService
	let repository: WalletsRepository
	let typeormRepository: Repository<WalletEntity>
	// let testingModule: TestingModule;

	const testConnectionName = "testConnection"
	const dbname = `__wadd_test__${Date.now()}`

	beforeAll(async () => {
		// testingModule = await Test.createTestingModule({
		// 	providers: [
		// 		WalletService,
		// 		WalletsRepository,
		// 		{
		// 			provide: getRepositoryToken(WalletEntity),
		// 			useClass: Repository,
		// 		},
		// 	],
		// }).compile();

		// let connection = await createConnection({
		// 	type: "sqlite",
		// 	database: ":memory:",
		// 	dropSchema: true,
		// 	entities: [WalletEntity],
		// 	synchronize: true,
		// 	logging: false,
		// 	name: testConnectionName
		// });

		await createConnection({
			type: "mongodb",
			url: "mongodb://localhost",
			port: 27017,
			database: dbname,
			dropSchema: true,
			entities: [WalletEntity],
			logging: false,
			name: testConnectionName,
		})

		typeormRepository = getRepository(WalletEntity, testConnectionName)
		repository = new WalletsRepository(typeormRepository)
		service = new WalletsService(repository)

		// return connection;
	})

	afterAll(async () => {
		await getConnection(testConnectionName).close()
	})

	afterEach(async () => {
		await getConnection(testConnectionName).dropDatabase()
	})

	it("Repository should be defined", () => {
		expect(repository).toBeDefined()
	})

	it("Service should be defined", () => {
		expect(service).toBeDefined()
	})

	describe("create", () => {
		it("Should create a Wallet", async () => {
			const testWalletCreated: Wallet = await service.create(mockWalletPartial)

			expect(testWalletCreated).toBeTruthy()
			expect(Object.keys(testWalletCreated).length).toEqual(15)

			expect(testWalletCreated.created_at).toBeTruthy()
			expect(testWalletCreated.updated_at).toEqual(null)
			expect(testWalletCreated.deleted_at).toEqual(null)
			expect(testWalletCreated.archived_at).toEqual(null)
		})

		it("New Wallet should have all needed properties", async () => {
			const testWalletCreated: Wallet = await service.create(mockWalletPartial)

			for (const key of Object.keys(mockWallet)) {
				expect(testWalletCreated).toHaveProperty(key)
			}

			for (const key of Object.keys(mockWalletPartial)) {
				expect(testWalletCreated[key]).toEqual(mockWalletPartial[key])
			}
		})

		it("Should create a Wallet with non-enum values", async () => {
			const testWalletCreated: Wallet = await service.create({
				...mockWalletPartial,
				default_currency: "HUF" as any,
				type: "CASH" as any,
			})

			expect(testWalletCreated).toBeTruthy()
			expect(Object.keys(testWalletCreated).length).toEqual(15)

			expect(testWalletCreated.default_currency).toEqual("HUF")
			expect(testWalletCreated.default_currency).toEqual(Currency.HUF)
			expect(testWalletCreated.type).toEqual("CASH")
			expect(testWalletCreated.type).toEqual(WalletType.CASH)
		})

		it("Should create a wallet with float 'initial_balance'", async () => {
			const testWalletCreated: Wallet = await service.create({
				...mockWalletPartial,
				initial_balance: 20.367,
			})

			expect(testWalletCreated).toBeTruthy()
			expect(Object.keys(testWalletCreated).length).toEqual(15)

			expect(testWalletCreated.initial_balance).toEqual(20.367)
		})
	})

	describe("exists", () => {
		it("Should find the created Wallet", async () => {
			const testWalletCreated: Wallet = await service.create(mockWalletPartial)

			const walletFound = await service.exists(testWalletCreated.id)

			expect(walletFound).toEqual(true)
		})

		it("Should not find any Wallet with a random ID", async () => {
			const walletFound = await service.exists("000000000000")

			expect(walletFound).toEqual(false)
		})
	})

	describe("update", () => {
		it("Should update the Wallet", async () => {
			const testWalletCreated: Wallet = await service.create(mockWalletPartial)

			const updatedWallet = await service.update(testWalletCreated.id, {
				name: "New Name",
				order: 333,
				initial_balance: 666,
				default_currency: Currency.HUF,
				type: WalletType.CASH,
				icon_file_id: "8f18f70a-1fe0-47ce-b021-3977275c7407",
			})

			expect(updatedWallet).toBeTruthy()
			expect(Object.keys(updatedWallet).length).toEqual(15)

			expect(updatedWallet.name).not.toEqual(mockWalletPartial.name)
			expect(updatedWallet.order).not.toEqual(mockWalletPartial.order)
			expect(updatedWallet.initial_balance).not.toEqual(mockWalletPartial.initial_balance)

			expect(updatedWallet.name).toEqual("New Name")
			expect(updatedWallet.order).toEqual(333)
			expect(updatedWallet.initial_balance).toEqual(666)

			expect(updatedWallet.updated_at).toBeTruthy()
			expect(updatedWallet.updated_at).not.toEqual(testWalletCreated.updated_at)

			for (const value of Object.values(updatedWallet)) {
				expect(value).not.toEqual(undefined)
			}
		})

		it("Should throw EntityNotFoundException exception", async () => {
			expect(async () => {
				await service.update("000000000000", {
					name: "New Name 2",
					order: 444,
					initial_balance: 555,
					default_currency: Currency.HUF,
					type: WalletType.CASH,
					icon_file_id: "8f18f70a-1fe0-47ce-b021-3977275c7407",
				})
			}).rejects.toThrow(EntityNotFoundException)
		})

		it("Should update the Wallet with non-enum values", async () => {
			const testWalletCreated: Wallet = await service.create(mockWalletPartial)

			const updatedWallet = await service.update(testWalletCreated.id, {
				name: "New Name",
				order: 333,
				initial_balance: 666,
				default_currency: "HUF" as any,
				type: "CASH" as any,
				icon_file_id: "8f18f70a-1fe0-47ce-b021-3977275c7407",
			})

			expect(updatedWallet).toBeTruthy()
			expect(Object.keys(updatedWallet).length).toEqual(15)

			expect(updatedWallet.default_currency).toEqual("HUF")
			expect(updatedWallet.default_currency).toEqual(Currency.HUF)
			expect(updatedWallet.type).toEqual("CASH")
			expect(updatedWallet.type).toEqual(WalletType.CASH)
		})
	})

	describe("get", () => {
		it("Should find the Wallet", async () => {
			const testWalletCreated: Wallet = await service.create(mockWalletPartial)

			const foundWallet = await service.get(testWalletCreated.id)

			expect(foundWallet).toBeTruthy()
			expect(Object.keys(foundWallet).length).toEqual(15)

			for (const value of Object.values(foundWallet)) {
				expect(value).not.toEqual(undefined)
			}
		})

		it("Should not find the Wallet with random ID", async () => {
			expect(async () => await service.get("000000000000")).rejects.toThrow(EntityNotFoundException)
		})

		it("Non-enum values should be valid", async () => {
			const testWalletCreated: Wallet = await service.create({
				...mockWalletPartial,
				default_currency: "HUF" as any,
				type: "CASH" as any,
			})

			const foundWallet = await service.get(testWalletCreated.id)

			expect(foundWallet).toBeTruthy()
			expect(Object.keys(foundWallet).length).toEqual(15)

			expect(foundWallet.default_currency).toEqual("HUF")
			expect(foundWallet.default_currency).toEqual(Currency.HUF)
			expect(foundWallet.type).toEqual("CASH")
			expect(foundWallet.type).toEqual(WalletType.CASH)
		})
	})

	describe("listAll", () => {
		it("Should list all Wallets", async () => {
			await service.create(mockWalletPartial)
			await service.create(mockWalletPartial)
			await service.create(mockWalletPartial)

			const wallets = await service.listAll()
			// console.log(wallets)

			expect(wallets).toHaveLength(3)

			for (const wallet of wallets) {
				expect(wallet).toBeTruthy()
				expect(Object.keys(wallet).length).toEqual(15)

				for (const value of Object.values(wallet)) {
					expect(value).not.toEqual(undefined)
				}
			}
		})
	})

	describe("listByUserId", () => {
		it("Should list user's Wallets", async () => {
			await service.create(mockWalletPartial)
			await service.create({ ...mockWalletPartial, owner_user_id: "__find_me" })
			await service.create({ ...mockWalletPartial, owner_user_id: "__find_me" })
			await service.create(mockWalletPartial)

			const wallets = await service.listByUserId("__find_me")

			expect(wallets).toHaveLength(2)

			for (const wallet of wallets) {
				expect(wallet).toBeTruthy()
				expect(Object.keys(wallet).length).toEqual(15)

				for (const value of Object.values(wallet)) {
					expect(value).not.toEqual(undefined)
				}
			}
		})

		it("Should not list any user Wallets", async () => {
			await service.create(mockWalletPartial)
			await service.create(mockWalletPartial)

			const wallets = await service.listByUserId("__find_me_fake")

			expect(wallets).toHaveLength(0)
			expect(wallets).toEqual([])
		})
	})

	describe("delete", () => {
		let wallet: Wallet

		beforeAll(async () => {
			wallet = await service.create(mockWalletPartial)
		})

		it("Should soft delete the Wallet", async () => {
			expect(wallet).toBeTruthy()

			const deletedWallet: Wallet = await service.delete(wallet.id)

			expect(deletedWallet).toBeTruthy()
			expect(deletedWallet.is_deleted).toEqual(true)
			expect(deletedWallet.deleted_at).toBeTruthy()
		})

		it("Should not find the deleted wallet with `exists`", async () => {
			expect(await service.exists(wallet.id)).toEqual(false)
		})

		it("Should not find the deleted wallet with `get`", async () => {
			expect(async () => await service.get(wallet.id)).rejects.toThrow(EntityNotFoundException)
		})
	})
})
