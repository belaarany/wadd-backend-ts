import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { IdentityMicroservice } from 'src/microservices/identity/identity.service';
import { CommonResponse, CommonResponseFactory } from 'src/shared/CommonResponse.service';
// import { RegisterRequest, RegisterResponse } from './identity.dto';
import { ExpenseService } from './expense.service';

@ApiTags('Expense')
@Controller("expense")
export class ExpenseController {
	constructor(
		private res: CommonResponseFactory,
		private expenseService: ExpenseService,
	) { }

	@Post("create-wallet")
	async createWallet(@Body() data): Promise<any> {
		let wallet = await this.expenseService.createWallet(0)
		
		console.log("starttick", Date.now())

		for (let i = 1; i < 10_000; i++) {
			this.expenseService.createWallet(i)
		}

		return wallet
	}
}
