import { faker } from "@faker-js/faker";
import { createConnection, getConnection, getRepository, Repository } from "typeorm"
import { generateId } from "../../../utils/GenerateId"
import { IdPrefix } from "../../../interfaces/enums/IdPrefix"
import { ExpensesRepository } from "../expenses.repository"
import { ExpensesService } from "../expenses.service"
import { Expense } from "../interfaces/expense.model"
import { CreateExpenseDto } from "../interfaces/expenses.dto"
import { ExpenseEntity } from "../schemas/expense.entity"
import { ExpenseMock } from "./expense.mock"
import { Currency } from "src/interfaces/enums/Currency"

describe("ExpensesService", () => {
  let service: ExpensesService
  let repository: ExpensesRepository
  let typeormRepository: Repository<ExpenseEntity>
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
      entities: [ExpenseEntity],
      logging: false,
      name: testConnectionName,
    })

    typeormRepository = getRepository(ExpenseEntity, testConnectionName)
    repository = new ExpensesRepository(typeormRepository)
    service = new ExpensesService(repository)

    // return connection;
  })

  afterAll(async () => {
    await getConnection(testConnectionName).close()
  })

  describe("create", () => {
    let mockExpenseCreate: CreateExpenseDto

    beforeAll(() => {
      mockExpenseCreate = ExpenseMock.makeCreateRequest()
    })

    it("Should create an Expense", async () => {
      const expense = await service.create(mockExpenseCreate)

      expect(expense).toBeTruthy()
    })

    it("Should have all the necessary keys", async () => {
      const expense = await service.create(mockExpenseCreate)
      const modelKeys = ExpenseMock.getModelKeys()

      expect(Object.keys(expense).length).toEqual(Object.keys(modelKeys).length)

      for (const key of Object.keys(expense)) {
        expect(modelKeys.includes(key)).toStrictEqual(true)
      }

      for (const key of modelKeys) {
        expect(expense).toHaveProperty(key)
      }
    })

    it("Each keys should have the correct value", async () => {
      const expense = await service.create(mockExpenseCreate)

      for (const key of Object.keys(mockExpenseCreate)) {
        expect(expense).toHaveProperty(key)
        expect(expense[key]).toStrictEqual(mockExpenseCreate[key])
      }
    })

    it("Each keys should not have undefined value", async () => {
      const expense = await service.create(mockExpenseCreate)

      for (const key of Object.values(expense)) {
        expect(key).not.toEqual(undefined)
      }
    })

    it("Should create an Expense with float in 'amount'", async () => {
      const amount = 582.5486

      const expense = await service.create({
        ...mockExpenseCreate,
        amount: amount,
      })

      expect(expense).toBeTruthy()

      expect(expense.amount).toEqual(amount)
    })

    it("The 'created_at' key should be set", async () => {
      const expense = await service.create(mockExpenseCreate)

      expect(expense.created_at).toBeTruthy()
      expect(expense.created_at).toBeInstanceOf(Date)
    })

    it("The 'kind' key should have the value 'expense'", async () => {
      const expense = await service.create(mockExpenseCreate)

      expect(expense.kind).toBeTruthy()
      expect(expense.kind).toEqual("expense")
    })

    it("The 'currency' should be a valid enum value", async () => {
      const expense = await service.create(mockExpenseCreate)

      expect(Object.values(Currency).includes(expense.currency)).toEqual(true)
    })

    it("The 'related_income_ids' should be an empty array", async () => {
      const expense = await service.create({
        ...mockExpenseCreate,
        related_income_ids: [],
      })

      expect(expense.related_income_ids).toBeInstanceOf(Array)
      expect(expense.related_income_ids).toStrictEqual([])
      expect(expense.related_income_ids.length).toEqual(0)
    })

    it("The 'related_income_ids' should not be an empty array", async () => {
      const relatedExpIds = new Array(5).fill(null).map(() => generateId(IdPrefix.EXPENSE))

      const income = await service.create({
        ...mockExpenseCreate,
        related_income_ids: relatedExpIds,
      })

      expect(income.related_income_ids).toBeInstanceOf(Array)
      expect(income.related_income_ids).toStrictEqual(relatedExpIds)
      expect(income.related_income_ids.length).toEqual(relatedExpIds.length)
    })

    it("The 'tags' should be an empty array", async () => {
      const expense = await service.create({
        ...mockExpenseCreate,
        tags: [],
      })

      expect(expense.tags).toBeInstanceOf(Array)
      expect(expense.tags).toStrictEqual([])
      expect(expense.tags.length).toEqual(0)
    })

    it("The 'tags' should not be an empty array", async () => {
      const tags = new Array(5).fill(null).map(() => faker.lorem.word())

      const expense = await service.create({
        ...mockExpenseCreate,
        tags: tags,
      })

      expect(expense.tags).toBeInstanceOf(Array)
      expect(expense.tags).toStrictEqual(tags)
      expect(expense.tags.length).toEqual(tags.length)
    })

    it("The 'attachment_file_ids' should be an empty array", async () => {
      const expense = await service.create({
        ...mockExpenseCreate,
        attachment_file_ids: [],
      })

      expect(expense.attachment_file_ids).toBeInstanceOf(Array)
      expect(expense.attachment_file_ids).toStrictEqual([])
      expect(expense.attachment_file_ids.length).toEqual(0)
    })

    it("The 'attachment_file_ids' should not be an empty array", async () => {
      const attachmentFileIds = new Array(5).fill(null).map(() => generateId(IdPrefix.FILE))

      const expense = await service.create({
        ...mockExpenseCreate,
        attachment_file_ids: attachmentFileIds,
      })

      expect(expense.attachment_file_ids).toBeInstanceOf(Array)
      expect(expense.attachment_file_ids).toStrictEqual(attachmentFileIds)
      expect(expense.attachment_file_ids.length).toEqual(attachmentFileIds.length)
    })
  })

  describe("exists", () => {
    it("Should find the created Expense", async () => {
      const expense: Expense = await service.create(ExpenseMock.makeCreateRequest())

      const found = await service.exists(expense.id)

      expect(found).toEqual(true)
    })

    it("Should not find any Expense with a random ID", async () => {
      const found = await service.exists(generateId(IdPrefix.EXPENSE))

      expect(found).toEqual(false)
    })
  })

  describe("listByWalletId", () => {
    const mockExpenseCreates: CreateExpenseDto[] = []

    beforeAll(() => {
      new Array(100).fill(null).forEach((_value, index) => {
        mockExpenseCreates[index] = ExpenseMock.makeCreateRequest()
      })
    })

    it("Should list the Wallet's Expenses", async () => {
      const walletId: string = generateId(IdPrefix.WALLET)

      mockExpenseCreates[5].wallet_id = walletId
      mockExpenseCreates[13].wallet_id = walletId
      mockExpenseCreates[27].wallet_id = walletId
      mockExpenseCreates[46].wallet_id = walletId
      mockExpenseCreates[72].wallet_id = walletId

      const expenses: Expense[] = []

      for (const mockExpenseCreate of mockExpenseCreates) {
        const expense = await service.create(mockExpenseCreate)
        expenses.push(expense)
      }

      expect(expenses.length).toEqual(100)

      const filteredExpenses = await service.listByWalletIds([walletId])

      expect(filteredExpenses).toBeTruthy()
      expect(filteredExpenses.length).toBeTruthy()
      expect(filteredExpenses.length).toEqual(5)
    })

    it("Should return with empty array", async () => {
      const walletId: string = generateId(IdPrefix.WALLET)

      const expenses: Expense[] = []

      for (const mockExpenseCreate of mockExpenseCreates) {
        const expense = await service.create(mockExpenseCreate)
        expenses.push(expense)
      }

      expect(expenses.length).toEqual(100)

      const filteredExpenses = await service.listByWalletIds([walletId])

      expect(filteredExpenses).toBeTruthy()
      expect(filteredExpenses.length).toEqual(0)
    })

    it("Should work with multiple Wallet IDs", async () => {
      const walletId_1: string = generateId(IdPrefix.WALLET)
      const walletId_2: string = generateId(IdPrefix.WALLET)
      const walletId_3: string = generateId(IdPrefix.WALLET)

      mockExpenseCreates[2].wallet_id = walletId_1
      mockExpenseCreates[23].wallet_id = walletId_1
      mockExpenseCreates[45].wallet_id = walletId_2
      mockExpenseCreates[48].wallet_id = walletId_3
      mockExpenseCreates[79].wallet_id = walletId_3

      const expenses: Expense[] = []

      for (const mockExpenseCreate of mockExpenseCreates) {
        const expense = await service.create(mockExpenseCreate)
        expenses.push(expense)
      }

      expect(expenses.length).toEqual(100)

      const filteredExpenses = await service.listByWalletIds([walletId_1, walletId_2, walletId_3])

      expect(filteredExpenses).toBeTruthy()
      expect(filteredExpenses.length).toEqual(5)
    })

    it.todo("Should not return deleted items")

    it.todo("Should not return cancelled items")
  })

  describe("listByIds", () => {
    const mockExpenseCreates: CreateExpenseDto[] = []

    beforeAll(() => {
      new Array(100).fill(null).forEach((_value, index) => {
        mockExpenseCreates[index] = ExpenseMock.makeCreateRequest()
      })
    })

    it("Should list the Expenses", async () => {
      const expenses: Expense[] = []

      for (const mockExpenseCreate of mockExpenseCreates) {
        const expense = await service.create(mockExpenseCreate)
        expenses.push(expense)
      }

      const expenseIds = []

      expenseIds.push(expenses[9].id)
      expenseIds.push(expenses[19].id)
      expenseIds.push(expenses[29].id)
      expenseIds.push(expenses[39].id)
      expenseIds.push(expenses[49].id)

      expect(expenses.length).toEqual(100)

      const filteredExpenses = await service.listByIds(expenseIds)

      expect(filteredExpenses).toBeTruthy()
      expect(filteredExpenses.length).toBeTruthy()
      expect(filteredExpenses.length).toEqual(5)
    })

    it("Should return an empty array", async () => {
      const expenses: Expense[] = []

      for (const mockExpenseCreate of mockExpenseCreates) {
        const expense = await service.create(mockExpenseCreate)
        expenses.push(expense)
      }

      const expenseIds = [
        generateId(IdPrefix.EXPENSE),
        generateId(IdPrefix.EXPENSE),
        generateId(IdPrefix.EXPENSE),
        generateId(IdPrefix.EXPENSE),
        generateId(IdPrefix.EXPENSE),
      ]

      expect(expenses.length).toEqual(100)

      const filteredExpenses = await service.listByIds(expenseIds)

      expect(filteredExpenses).toBeTruthy()
      expect(filteredExpenses.length).toEqual(0)
    })
  })
})
