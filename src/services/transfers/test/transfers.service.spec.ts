import { createConnection, getConnection, getRepository, Repository } from "typeorm"
import { generateId } from "../../../utils/GenerateId"
import { IdPrefix } from "../../../interfaces/enums/IdPrefix"
import { Transfer } from "../interfaces/transfer.model"
import { CreateTransferDto } from "../interfaces/transfers.dto"
import { TransferEntity } from "../schemas/transfer.entity"
import { TransfersRepository } from "../transfers.repository"
import { TransfersService } from "../transfers.service"
import { TransferMock } from "./transfer.mock"
import { Currency } from "src/interfaces/enums/Currency"

describe("TransfersService", () => {
	let service: TransfersService
	let repository: TransfersRepository
	let typeormRepository: Repository<TransferEntity>
	// let testingModule: TestingModule;

	const testConnectionName = "testConnection"
	const dbname = `__wadd_test__${Date.now()}`

	beforeAll(async () => {
		await createConnection({
			type: "mongodb",
			url: "mongodb://localhost",
			port: 27017,
			database: dbname,
			dropSchema: true,
			entities: [TransferEntity],
			logging: false,
			name: testConnectionName,
		})

		typeormRepository = getRepository(TransferEntity, testConnectionName)
		repository = new TransfersRepository(typeormRepository)
		service = new TransfersService(repository)

		// return connection;
	})

	afterAll(async () => {
		await getConnection(testConnectionName).close()
	})

	describe("create", () => {
		let mockTransferCreate: CreateTransferDto

		beforeAll(() => {
			mockTransferCreate = TransferMock.makeCreateRequest()
		})

		it("Should create an Transfer", async () => {
			const transfer = await service.create(mockTransferCreate)

			expect(transfer).toBeTruthy()
		})

		it("Should have all the necessary keys", async () => {
			const transfer = await service.create(mockTransferCreate)
			const modelKeys = TransferMock.getModelKeys()

			expect(Object.keys(transfer).length).toEqual(Object.keys(modelKeys).length)

			for (const key of Object.keys(transfer)) {
				expect(modelKeys.includes(key)).toStrictEqual(true)
			}

			for (const key of modelKeys) {
				expect(transfer).toHaveProperty(key)
			}
		})

		it("Each keys should have the correct value", async () => {
			const transfer = await service.create(mockTransferCreate)

			for (const key of Object.keys(mockTransferCreate)) {
				expect(transfer).toHaveProperty(key)
				expect(transfer[key]).toStrictEqual(mockTransferCreate[key])
			}
		})

		it("Each keys should not have undefined value", async () => {
			const transfer = await service.create(mockTransferCreate)

			for (const key of Object.values(transfer)) {
				expect(key).not.toEqual(undefined)
			}
		})

		it("Should create an Transfer with float in 'source_amount' and 'target_amount'", async () => {
			const sourceAmount = 582.5486
			const targetAmount = 7524.95157

			const transfer = await service.create({
				...mockTransferCreate,
				source_amount: sourceAmount,
				target_amount: targetAmount,
			})

			expect(transfer).toBeTruthy()

			expect(transfer.source_amount).toEqual(sourceAmount)
			expect(transfer.target_amount).toEqual(targetAmount)
		})

		it("The 'created_at' key should be set", async () => {
			const transfer = await service.create(mockTransferCreate)

			expect(transfer.created_at).toBeTruthy()
			expect(transfer.created_at).toBeInstanceOf(Date)
		})

		it("The 'kind' key should have the value 'transfer'", async () => {
			const transfer = await service.create(mockTransferCreate)

			expect(transfer.kind).toBeTruthy()
			expect(transfer.kind).toEqual("transfer")
		})

		it("The 'source_currency' and 'target_currency' should be a valid enum value", async () => {
			const transfer = await service.create(mockTransferCreate)

			expect(Object.values(Currency).includes(transfer.source_currency)).toEqual(true)
			expect(Object.values(Currency).includes(transfer.target_currency)).toEqual(true)
		})
	})

	describe("exists", () => {
		it("Should find the created Transfer", async () => {
			const transfer: Transfer = await service.create(TransferMock.makeCreateRequest())

			const found = await service.exists(transfer.id)

			expect(found).toEqual(true)
		})

		it("Should not find any Transfer with a random ID", async () => {
			const found = await service.exists(generateId(IdPrefix.TRANSFER))

			expect(found).toEqual(false)
		})
	})

	describe("listByWalletId", () => {
		const mockTransferCreates: CreateTransferDto[] = []

		beforeAll(() => {
			new Array(100).fill(null).forEach((_value, index) => {
				mockTransferCreates[index] = TransferMock.makeCreateRequest()
			})
		})

		it("Should list the Wallet's Transfers by 'source_wallet_id'", async () => {
			const walletId: string = generateId(IdPrefix.WALLET)

			mockTransferCreates[8].source_wallet_id = walletId
			mockTransferCreates[18].source_wallet_id = walletId
			mockTransferCreates[38].source_wallet_id = walletId
			mockTransferCreates[49].source_wallet_id = walletId
			mockTransferCreates[82].source_wallet_id = walletId

			const transfers: Transfer[] = []

			for (const mockTransferCreate of mockTransferCreates) {
				const transfer = await service.create(mockTransferCreate)
				transfers.push(transfer)
			}

			expect(transfers.length).toEqual(100)

			const filteredTransfers = await service.listByWalletIds([walletId])

			expect(filteredTransfers).toBeTruthy()
			expect(filteredTransfers.length).toBeTruthy()
			expect(filteredTransfers.length).toEqual(5)
		})

		it("Should list the Wallet's Transfers by 'target_wallet_id'", async () => {
			const walletId: string = generateId(IdPrefix.WALLET)

			mockTransferCreates[5].target_wallet_id = walletId
			mockTransferCreates[48].target_wallet_id = walletId
			mockTransferCreates[59].target_wallet_id = walletId
			mockTransferCreates[62].target_wallet_id = walletId
			mockTransferCreates[94].target_wallet_id = walletId

			const transfers: Transfer[] = []

			for (const mockTransferCreate of mockTransferCreates) {
				const transfer = await service.create(mockTransferCreate)
				transfers.push(transfer)
			}

			expect(transfers.length).toEqual(100)

			const filteredTransfers = await service.listByWalletIds([walletId])

			expect(filteredTransfers).toBeTruthy()
			expect(filteredTransfers.length).toBeTruthy()
			expect(filteredTransfers.length).toEqual(5)
		})

		it("Should list with multiple Wallet IDs", async () => {
			const walletId_1: string = generateId(IdPrefix.WALLET)
			const walletId_2: string = generateId(IdPrefix.WALLET)
			const walletId_3: string = generateId(IdPrefix.WALLET)

			mockTransferCreates[10].source_wallet_id = walletId_1
			mockTransferCreates[11].source_wallet_id = walletId_1
			mockTransferCreates[14].target_wallet_id = walletId_1
			mockTransferCreates[20].target_wallet_id = walletId_1

			mockTransferCreates[23].source_wallet_id = walletId_2
			mockTransferCreates[33].source_wallet_id = walletId_2
			mockTransferCreates[36].target_wallet_id = walletId_2
			mockTransferCreates[40].target_wallet_id = walletId_2

			mockTransferCreates[49].source_wallet_id = walletId_3
			mockTransferCreates[53].source_wallet_id = walletId_3
			mockTransferCreates[67].target_wallet_id = walletId_3
			mockTransferCreates[78].target_wallet_id = walletId_3

			const transfers: Transfer[] = []

			for (const mockTransferCreate of mockTransferCreates) {
				const transfer = await service.create(mockTransferCreate)
				transfers.push(transfer)
			}

			expect(transfers.length).toEqual(100)

			const filteredTransfers = await service.listByWalletIds([walletId_1, walletId_2, walletId_3])

			expect(filteredTransfers).toBeTruthy()
			expect(filteredTransfers.length).toBeTruthy()
			expect(filteredTransfers.length).toEqual(12)
		})

		it("Should return with empty array", async () => {
			const walletId: string = generateId(IdPrefix.WALLET)

			const transfers: Transfer[] = []

			for (const mockTransferCreate of mockTransferCreates) {
				const transfer = await service.create(mockTransferCreate)
				transfers.push(transfer)
			}

			expect(transfers.length).toEqual(100)

			const filteredTransfers = await service.listByWalletIds([walletId])

			expect(filteredTransfers).toBeTruthy()
			expect(filteredTransfers).toEqual(expect.any(Array))
			expect(filteredTransfers.length).toEqual(0)
		})
	})
})
