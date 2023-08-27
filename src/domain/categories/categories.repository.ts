import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { CategoryEntity } from "./schemas/category.entity"
import { ICategoriesRepository } from "./interfaces/categories.interfaces"

export class CategoriesRepository extends Repository<CategoryEntity> implements ICategoriesRepository {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly repository: Repository<CategoryEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner)
  }
}
