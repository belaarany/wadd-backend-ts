import { createConnection, getConnection, getRepository, Repository } from "typeorm"
import { generateId } from "../../../utils/GenerateId"
import { IdPrefix } from "../../../interfaces/enums/IdPrefix"
import { CategoriesRepository } from "../categories.repository"
import { CategoriesService } from "../categories.service"
import { CreateCategoryDto } from "../interfaces/category.dto"
import { Category } from "../interfaces/category.model"
import { CategoryEntity } from "../schemas/category.entity"
import { CategoryMock } from "./category.mock"

describe("CategoriesService", () => {
	let service: CategoriesService
	let repository: CategoriesRepository
	let typeormRepository: Repository<CategoryEntity>
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
			entities: [CategoryEntity],
			logging: false,
			name: testConnectionName,
		})

		typeormRepository = getRepository(CategoryEntity, testConnectionName)
		repository = new CategoriesRepository(typeormRepository)
		service = new CategoriesService(repository)

		// return connection;
	})

	afterAll(async () => {
		await getConnection(testConnectionName).close()
	})

	describe("create", () => {
		let mockCategoryCreate: CreateCategoryDto

		beforeAll(() => {
			mockCategoryCreate = CategoryMock.makeCreateRequest()
		})

		it("Should create an Category", async () => {
			const category = await service.create(mockCategoryCreate)

			expect(category).toBeTruthy()
		})

		it("Should have all the necessary keys", async () => {
			const category = await service.create(mockCategoryCreate)
			const modelKeys = CategoryMock.getModelKeys()

			expect(Object.keys(category).length).toEqual(Object.keys(modelKeys).length)

			for (const key of Object.keys(category)) {
				expect(modelKeys.includes(key)).toStrictEqual(true)
			}

			for (const key of modelKeys) {
				expect(category).toHaveProperty(key)
			}
		})

		it("Each keys should have the correct value", async () => {
			const category = await service.create(mockCategoryCreate)

			for (const key of Object.keys(mockCategoryCreate)) {
				expect(category).toHaveProperty(key)
				expect(category[key]).toStrictEqual(mockCategoryCreate[key])
			}
		})

		it("Each keys should not have undefined value", async () => {
			const category = await service.create(mockCategoryCreate)

			for (const key of Object.values(category)) {
				expect(key).not.toEqual(undefined)
			}
		})

		it("The 'created_at' key should be set", async () => {
			const category = await service.create(mockCategoryCreate)

			expect(category.created_at).toBeTruthy()
			expect(category.created_at).toBeInstanceOf(Date)
		})

		it("The 'kind' key should have the value 'category'", async () => {
			const category = await service.create(mockCategoryCreate)

			expect(category.kind).toBeTruthy()
			expect(category.kind).toEqual("category")
		})
	})

	describe("exists", () => {
		it("Should find the created Category", async () => {
			const category: Category = await service.create(CategoryMock.makeCreateRequest())

			const found = await service.exists(category.id)

			expect(found).toEqual(true)
		})

		it("Should not find any Category with a random ID", async () => {
			const found = await service.exists(generateId(IdPrefix.CATEGORY))

			expect(found).toEqual(false)
		})
	})

	describe("listByUserId", () => {
		const mockCategoryCreates: CreateCategoryDto[] = []

		beforeAll(() => {
			new Array(100).fill(null).forEach((_value, index) => {
				mockCategoryCreates[index] = CategoryMock.makeCreateRequest()
			})
		})

		it("Should list the User's Categories", async () => {
			const userId: string = generateId(IdPrefix.USER)

			mockCategoryCreates[8].owner_user_id = userId
			mockCategoryCreates[18].owner_user_id = userId
			mockCategoryCreates[38].owner_user_id = userId
			mockCategoryCreates[49].owner_user_id = userId
			mockCategoryCreates[82].owner_user_id = userId

			const categories: Category[] = []

			for (const mockTransferCreate of mockCategoryCreates) {
				const category = await service.create(mockTransferCreate)
				categories.push(category)
			}

			expect(categories.length).toEqual(100)

			const filteredCategories = await service.listByUserId(userId)

			expect(filteredCategories).toBeTruthy()
			expect(filteredCategories.length).toBeTruthy()
			expect(filteredCategories.length).toEqual(5)
		})

		it("Should return with empty array", async () => {
			const userId: string = generateId(IdPrefix.USER)

			const categories: Category[] = []

			for (const mockTransferCreate of mockCategoryCreates) {
				const category = await service.create(mockTransferCreate)
				categories.push(category)
			}

			expect(categories.length).toEqual(100)

			const filteredCategories = await service.listByUserId(userId)

			expect(filteredCategories).toBeTruthy()
			expect(filteredCategories).toEqual(expect.any(Array))
			expect(filteredCategories.length).toEqual(0)
		})
	})

	describe("listByIds", () => {
		const mockCategoryCreates: CreateCategoryDto[] = []

		beforeAll(() => {
			new Array(100).fill(null).forEach((_value, index) => {
				mockCategoryCreates[index] = CategoryMock.makeCreateRequest()
			})
		})

		it("Should list the Categories", async () => {
			const categories: Category[] = []

			for (const mockTransferCreate of mockCategoryCreates) {
				const category = await service.create(mockTransferCreate)
				categories.push(category)
			}

			expect(categories.length).toEqual(100)

			const filteredCategories = await service.listByIds([
				categories[15].id,
				categories[58].id,
				categories[83].id,
			])

			expect(filteredCategories).toBeTruthy()
			expect(filteredCategories.length).toBeTruthy()
			expect(filteredCategories.length).toEqual(3)
		})

		it("Should return with empty array", async () => {
			const categories: Category[] = []

			for (const mockTransferCreate of mockCategoryCreates) {
				const category = await service.create(mockTransferCreate)
				categories.push(category)
			}

			expect(categories.length).toEqual(100)

			const filteredCategories = await service.listByIds([
				generateId(IdPrefix.CATEGORY),
				generateId(IdPrefix.CATEGORY),
				generateId(IdPrefix.CATEGORY),
			])

			expect(filteredCategories).toBeTruthy()
			expect(filteredCategories).toEqual(expect.any(Array))
			expect(filteredCategories.length).toEqual(0)
		})
	})
})
