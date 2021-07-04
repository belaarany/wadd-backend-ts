import { Module } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { ExpenseController } from './expense.controller';
import { CommonResponseModule } from 'src/shared/CommonResponse.module';
import { ExpenseMicroserviceModule } from 'src/microservices/expense/expense.module';

@Module({
	imports: [ExpenseMicroserviceModule, CommonResponseModule],
	controllers: [ExpenseController],
	providers: [ExpenseService],
	exports: [],
})
export class ExpenseModule { }
