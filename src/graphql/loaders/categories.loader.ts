import { Injectable } from "@nestjs/common"
import * as DataLoader from "dataloader"
import { NestDataLoader } from "nestjs-dataloader"
import { CategoriesService } from "src/services/categories/categories.service"
import { Category } from "src/services/categories/interfaces/category.model"
import { ExpenseMicroserviceCategoriesService } from "../../microservices/expense/services/categories.service"

@Injectable()
export class CategoriesLoader implements NestDataLoader<string, Category> {
	constructor(private categoriesService: CategoriesService) {}

	generateDataLoader(): DataLoader<string, Category> {
		return new DataLoader<string, Category>((categoryIds) =>
			this.categoriesService.listByIds(categoryIds as string[]),
		)
	}
}
