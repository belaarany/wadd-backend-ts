import { createConnection, getConnection, getRepository, Repository } from "typeorm"
import { Currency } from "../../../core/interfaces/enums/Currency"
import { IdPrefix } from "../../../core/interfaces/enums/IdPrefix"
import { generateId } from "src/core/utils/GenerateId"
import { IncomesRepository } from "../incomes.repository"
import { IncomesService } from "../incomes.service"
import { Income } from "../interfaces/income.model"
import { CreateIncomeDto } from "../interfaces/incomes.dto"
import { IncomeEntity } from "../schemas/income.entity"
import { IncomeMock } from "./income.mock"
import { faker } from "@faker-js/faker";

describe("IncomesService", () => {
  let service: IncomesService
  let repository: IncomesRepository
  let typeormRepository: Repository<IncomeEntity>
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
      entities: [IncomeEntity],
      logging: false,
      name: testConnectionName,
    })

    typeormRepository = getRepository(IncomeEntity, testConnectionName)
    repository = new IncomesRepository(typeormRepository)
    service = new IncomesService(repository)

    // return connection;
  })

  afterAll(async () => {
    await getConnection(testConnectionName).close()
  })

  describe("create", () => {
    let mockIncomeCreate: CreateIncomeDto

    beforeAll(() => {
      mockIncomeCreate = IncomeMock.makeCreateRequest()
    })

    it("Should create an Income", async () => {
      const income = await service.create(mockIncomeCreate)

      expect(income).toBeTruthy()
    })

    it("Should have all the necessary keys", async () => {
      const income = await service.create(mockIncomeCreate)
      const modelKeys = IncomeMock.getModelKeys()

      expect(Object.keys(income).length).toEqual(Object.keys(modelKeys).length)

      for (const key of Object.keys(income)) {
        expect(modelKeys.includes(key)).toStrictEqual(true)
      }

      for (const key of modelKeys) {
        expect(income).toHaveProperty(key)
      }
    })

    it("Each keys should have the correct value", async () => {
      const income = await service.create(mockIncomeCreate)

      for (const key of Object.keys(mockIncomeCreate)) {
        expect(income).toHaveProperty(key)
        expect(income[key]).toStrictEqual(mockIncomeCreate[key])
      }
    })

    it("Each keys should not have undefined value", async () => {
      const income = await service.create(mockIncomeCreate)

      for (const key of Object.values(income)) {
        expect(key).not.toEqual(undefined)
      }
    })

    it("Should create an Income with float in 'amount'", async () => {
      const amount = 582.5486

      const income = await service.create({
        ...mockIncomeCreate,
        amount: amount,
      })

      expect(income).toBeTruthy()

      expect(income.amount).toEqual(amount)
    })

    it("The 'created_at' key should be set", async () => {
      const income = await service.create(mockIncomeCreate)

      expect(income.created_at).toBeTruthy()
      expect(income.created_at).toBeInstanceOf(Date)
    })

    it("The 'kind' key should have the value 'income'", async () => {
      const income = await service.create(mockIncomeCreate)

      expect(income.kind).toBeTruthy()
      expect(income.kind).toEqual("income")
    })

    it("The 'currency' should be a valid enum value", async () => {
      const income = await service.create(mockIncomeCreate)

      expect(Object.values(Currency).includes(income.currency)).toEqual(true)
    })

    it("The 'related_expense_ids' should be an empty array", async () => {
      const income = await service.create({
        ...mockIncomeCreate,
        related_expense_ids: [],
      })

      expect(income.related_expense_ids).toBeInstanceOf(Array)
      expect(income.related_expense_ids).toStrictEqual([])
      expect(income.related_expense_ids.length).toEqual(0)
    })

    it("The 'related_expense_ids' should not be an empty array", async () => {
      const relatedExpIds = new Array(5).fill(null).map(() => generateId(IdPrefix.EXPENSE))

      const income = await service.create({
        ...mockIncomeCreate,
        related_expense_ids: relatedExpIds,
      })

      expect(income.related_expense_ids).toBeInstanceOf(Array)
      expect(income.related_expense_ids).toStrictEqual(relatedExpIds)
      expect(income.related_expense_ids.length).toEqual(relatedExpIds.length)
    })

    it("The 'tags' should be an empty array", async () => {
      const income = await service.create({
        ...mockIncomeCreate,
        tags: [],
      })

      expect(income.tags).toBeInstanceOf(Array)
      expect(income.tags).toStrictEqual([])
      expect(income.tags.length).toEqual(0)
    })

    it("The 'tags' should not be an empty array", async () => {
      const tags = new Array(5).fill(null).map(() => faker.lorem.word())

      const income = await service.create({
        ...mockIncomeCreate,
        tags: tags,
      })

      expect(income.tags).toBeInstanceOf(Array)
      expect(income.tags).toStrictEqual(tags)
      expect(income.tags.length).toEqual(tags.length)
    })

    it("The 'attachment_file_ids' should be an empty array", async () => {
      const income = await service.create({
        ...mockIncomeCreate,
        attachment_file_ids: [],
      })

      expect(income.attachment_file_ids).toBeInstanceOf(Array)
      expect(income.attachment_file_ids).toStrictEqual([])
      expect(income.attachment_file_ids.length).toEqual(0)
    })

    it("The 'attachment_file_ids' should not be an empty array", async () => {
      const attachmentFileIds = new Array(5).fill(null).map(() => generateId(IdPrefix.FILE))

      const income = await service.create({
        ...mockIncomeCreate,
        attachment_file_ids: attachmentFileIds,
      })

      expect(income.attachment_file_ids).toBeInstanceOf(Array)
      expect(income.attachment_file_ids).toStrictEqual(attachmentFileIds)
      expect(income.attachment_file_ids.length).toEqual(attachmentFileIds.length)
    })
  })

  describe("exists", () => {
    it("Should find the created Income", async () => {
      const income: Income = await service.create(IncomeMock.makeCreateRequest())

      const found = await service.exists(income.id)

      expect(found).toEqual(true)
    })

    it("Should not find any Income with a random ID", async () => {
      const found = await service.exists(generateId(IdPrefix.INCOME))

      expect(found).toEqual(false)
    })
  })

  describe("listByWalletId", () => {
    const mockIncomeCreates: CreateIncomeDto[] = []

    beforeAll(() => {
      new Array(100).fill(null).forEach((_value, index) => {
        mockIncomeCreates[index] = IncomeMock.makeCreateRequest()
      })
    })

    it("Should list the Wallet's Incomes", async () => {
      const walletId: string = generateId(IdPrefix.WALLET)

      mockIncomeCreates[5].wallet_id = walletId
      mockIncomeCreates[13].wallet_id = walletId
      mockIncomeCreates[27].wallet_id = walletId
      mockIncomeCreates[46].wallet_id = walletId
      mockIncomeCreates[72].wallet_id = walletId

      const incomes: Income[] = []

      for (const mockIncomeCreate of mockIncomeCreates) {
        const income = await service.create(mockIncomeCreate)
        incomes.push(income)
      }

      expect(incomes.length).toEqual(100)

      const filteredIncomes = await service.listByWalletIds([walletId])

      expect(filteredIncomes).toBeTruthy()
      expect(filteredIncomes.length).toBeTruthy()
      expect(filteredIncomes.length).toEqual(5)
    })

    it("Should return with empty array", async () => {
      const walletId: string = generateId(IdPrefix.WALLET)

      const incomes: Income[] = []

      for (const mockIncomeCreate of mockIncomeCreates) {
        const income = await service.create(mockIncomeCreate)
        incomes.push(income)
      }

      expect(incomes.length).toEqual(100)

      const filteredIncomes = await service.listByWalletIds([walletId])

      expect(filteredIncomes).toBeTruthy()
      expect(filteredIncomes.length).toEqual(0)
    })

    it("Should work with multiple Wallet IDs", async () => {
      const walletId_1: string = generateId(IdPrefix.WALLET)
      const walletId_2: string = generateId(IdPrefix.WALLET)
      const walletId_3: string = generateId(IdPrefix.WALLET)

      mockIncomeCreates[2].wallet_id = walletId_1
      mockIncomeCreates[23].wallet_id = walletId_1
      mockIncomeCreates[45].wallet_id = walletId_2
      mockIncomeCreates[48].wallet_id = walletId_3
      mockIncomeCreates[79].wallet_id = walletId_3

      const incomes: Income[] = []

      for (const mockIncomeCreate of mockIncomeCreates) {
        const income = await service.create(mockIncomeCreate)
        incomes.push(income)
      }

      expect(incomes.length).toEqual(100)

      const filteredIncomes = await service.listByWalletIds([walletId_1, walletId_2, walletId_3])

      expect(filteredIncomes).toBeTruthy()
      expect(filteredIncomes.length).toEqual(5)
    })

    it.todo("Should not return deleted items")

    it.todo("Should not return cancelled items")
  })

  describe("listByIds", () => {
    const mockIncomesCreates: CreateIncomeDto[] = []

    beforeAll(() => {
      new Array(100).fill(null).forEach((_value, index) => {
        mockIncomesCreates[index] = IncomeMock.makeCreateRequest()
      })
    })

    it("Should list the Incomes", async () => {
      const incomes: Income[] = []

      for (const mockIncomeCreate of mockIncomesCreates) {
        const income = await service.create(mockIncomeCreate)
        incomes.push(income)
      }

      const incomeIds = []

      incomeIds.push(incomes[9].id)
      incomeIds.push(incomes[19].id)
      incomeIds.push(incomes[29].id)
      incomeIds.push(incomes[39].id)
      incomeIds.push(incomes[49].id)

      expect(incomes.length).toEqual(100)

      const filteredIncomes = await service.listByIds(incomeIds)

      expect(filteredIncomes).toBeTruthy()
      expect(filteredIncomes.length).toBeTruthy()
      expect(filteredIncomes.length).toEqual(5)
    })

    it("Should return an empty array", async () => {
      const incomes: Income[] = []

      for (const mockIncomeCreate of mockIncomesCreates) {
        const income = await service.create(mockIncomeCreate)
        incomes.push(income)
      }

      const incomeIds = [
        generateId(IdPrefix.INCOME),
        generateId(IdPrefix.INCOME),
        generateId(IdPrefix.INCOME),
        generateId(IdPrefix.INCOME),
        generateId(IdPrefix.INCOME),
      ]

      expect(incomes.length).toEqual(100)

      const filteredIncomes = await service.listByIds(incomeIds)

      expect(filteredIncomes).toBeTruthy()
      expect(filteredIncomes.length).toEqual(0)
    })
  })

  // describe("getSummary", () => {
  // 	it("Manual amounts, same currency", async () => {
  // 		const walletId = generateId(IdPrefix.WALLET)

  // 		const expectTotal = 8_291_283.55182357789

  // 		await service.create(IncomeMock.makeCreateRequest())
  // 		await service.create(IncomeMock.makeCreateRequest())
  // 		await service.create(IncomeMock.makeCreateRequest())
  // 		await service.create(IncomeMock.makeCreateRequest({ wallet_id: walletId, currency: Currency.HUF, amount: 77384 }))
  // 		await service.create(IncomeMock.makeCreateRequest({ wallet_id: walletId, currency: Currency.HUF, amount: 59658.843 }))
  // 		await service.create(IncomeMock.makeCreateRequest({ wallet_id: walletId, currency: Currency.HUF, amount: 8121816.2436 }))
  // 		await service.create(IncomeMock.makeCreateRequest({ wallet_id: walletId, currency: Currency.HUF, amount: 32423.23 }))
  // 		await service.create(IncomeMock.makeCreateRequest({ wallet_id: walletId, currency: Currency.HUF, amount: 1 }))
  // 		await service.create(IncomeMock.makeCreateRequest({ wallet_id: walletId, currency: Currency.HUF, amount: 0.23522357789 }))

  // 		let summary = await service.getSummary([walletId])

  // 		// expect(total).toBeTruthy()
  // 		// expect(Object.keys(total).length).toEqual(1)
  // 		// expect(total).toHaveProperty("incomes")
  // 		// expect(total["income"]).toHaveProperty("wallets")
  // 		// expect(total["income"]["wallets"]).toHaveProperty(Currency.HUF)
  // 		// expect(total["income"]["wallets"][Currency.HUF]).toEqual(expectTotal)
  // 	})
  // 	it("Manual amounts, different currencies", async () => {
  // 		const walletId = generateId(IdPrefix.WALLET)
  // 		const expectTotalHUF = 8_291_283.5518235
  // 		const expectTotalUSD = 9_296_857.343265743255
  // 		await service.create(IncomeMock.makeCreateRequest())
  // 		await service.create(IncomeMock.makeCreateRequest())
  // 		await service.create(IncomeMock.makeCreateRequest())
  // 		await service.create(IncomeMock.makeCreateRequest({ wallet_id: walletId, currency: Currency.HUF, amount: 77384 }))
  // 		await service.create(IncomeMock.makeCreateRequest({ wallet_id: walletId, currency: Currency.HUF, amount: 59658.843 }))
  // 		await service.create(IncomeMock.makeCreateRequest({ wallet_id: walletId, currency: Currency.HUF, amount: 8121816.2436 }))
  // 		await service.create(IncomeMock.makeCreateRequest({ wallet_id: walletId, currency: Currency.HUF, amount: 32423.23 }))
  // 		await service.create(IncomeMock.makeCreateRequest({ wallet_id: walletId, currency: Currency.HUF, amount: 1 }))
  // 		await service.create(IncomeMock.makeCreateRequest({ wallet_id: walletId, currency: Currency.HUF, amount: 0.2352235 }))
  // 		await service.create(IncomeMock.makeCreateRequest({ wallet_id: walletId, currency: Currency.USD, amount: 1 }))
  // 		await service.create(IncomeMock.makeCreateRequest({ wallet_id: walletId, currency: Currency.USD, amount: 0.343265743255 }))
  // 		await service.create(IncomeMock.makeCreateRequest({ wallet_id: walletId, currency: Currency.USD, amount: 813518 }))
  // 		await service.create(IncomeMock.makeCreateRequest({ wallet_id: walletId, currency: Currency.USD, amount: 8483338 }))
  // 		let total = await service.getSummary([walletId])
  // 		expect(total).toBeTruthy()
  // 		expect(Object.keys(total).length).toEqual(1)
  // 		expect(total).toHaveProperty("incomes")
  // 		expect(Object.keys(total["incomes"]).length).toEqual(2)
  // 		expect(total["incomes"]).toHaveProperty(Currency.HUF)
  // 		expect(total["incomes"]).toHaveProperty(Currency.USD)
  // 		expect(total["incomes"][Currency.HUF]).toEqual(expectTotalHUF)
  // 		expect(total["incomes"][Currency.USD]).toEqual(expectTotalUSD)
  // 	})
  // 	it("Random amounts, random currencies", async () => {
  // 		const walletId = generateId(IdPrefix.WALLET)
  // 		let expectedTotal = 0
  // 		for (let index of (new Array(100).fill(null))) {
  // 			let params: Partial<CreateIncomeDto> = {
  // 				note: index,
  // 			}
  // 			if (Faker.datatype.boolean()) {
  // 				params.wallet_id = walletId
  // 				if (Faker.datatype.boolean()) {
  // 					params.amount = Faker.datatype.float(0.0001)
  // 					params.currency = Currency.HUF
  // 					expectedTotal = (((expectedTotal * 1000000) + (params.amount * 1000000)) / 1000000)
  // 				}
  // 				else {
  // 					params.currency = Faker.datatype.boolean() ? Currency.USD : Currency.EUR
  // 				}
  // 			}
  // 			await service.create(IncomeMock.makeCreateRequest(params))
  // 		}
  // 		let total = await service.getSummary([walletId])
  // 		expect(total).toBeTruthy()
  // 		expect(total).toEqual(expect.any(Object))
  // 		expect(Object.keys(total).length).toEqual(1)
  // 		expect(total).toHaveProperty("incomes")
  // 		expect(total["incomes"]).toHaveProperty(Currency.HUF)
  // 		expect(total["incomes"][Currency.HUF]).toEqual(expectedTotal)
  // 	})
  // 	it.todo("Should not return deleted items")
  // })
})
