import { Injectable } from "@nestjs/common"
import * as DataLoader from "dataloader"
import { NestDataLoader } from "nestjs-dataloader"
import { Category } from "src/interfaces/category.interface"

import { ExpenseMicroserviceCategoriesService } from "../../microservices/expense/services/categories.service";

@Injectable()
export class CategoriesLoader implements NestDataLoader<string, Category> {
	constructor(private expenseMicroserviceCategoriesService: ExpenseMicroserviceCategoriesService) {}

	generateDataLoader(): DataLoader<string, Category> {
		return new DataLoader<string, Category>((categoryIds) =>
			this.expenseMicroserviceCategoriesService.listCategories(categoryIds as string[]),
		)
	}
}
