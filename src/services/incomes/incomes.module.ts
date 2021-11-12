import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { IncomeEntity } from "./schemas/income.entity"
import { IncomesRepository } from "./incomes.repository"
import { IncomesService } from "./incomes.service"

@Module({
	imports: [TypeOrmModule.forFeature([IncomeEntity])],
	controllers: [],
	providers: [IncomesService, IncomesRepository],
	exports: [IncomesService]
})
export class IncomesModule {}
