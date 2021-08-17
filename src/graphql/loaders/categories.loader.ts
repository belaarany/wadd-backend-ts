import { Injectable } from "@nestjs/common"
import * as DataLoader from "dataloader"
import { NestDataLoader } from "nestjs-dataloader"
import { Category } from "src/interfaces/category.interface"
import { ExpenseMicroservice } from "src/microservices/expense/expense.service"

@Injectable()
export class CategoriesLoader implements NestDataLoader<string, Category> {
	constructor(private expenseMicroservice: ExpenseMicroservice) {}

	generateDataLoader(): DataLoader<string, Category> {
		return new DataLoader<string, Category>((categoryIds) =>
			this.expenseMicroservice.listCategories(categoryIds as string[]),
		)
	}
}
