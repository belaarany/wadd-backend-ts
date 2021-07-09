import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IdentityMicroservice } from 'src/microservices/identity/identity.service';
import { CommonResponse, CommonResponseFactory } from 'src/shared/CommonResponse.service';
import { CreateWalletHttpRequest, CreateWalletHttpResponseSuccess } from './expense.dto';
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
	@ApiOperation({ summary: "Creates a new Wallet." })
	@ApiCreatedResponse({ description: "Wallet successfully created.", type: CreateWalletHttpResponseSuccess })
	async createWallet(@Body() data: CreateWalletHttpRequest): Promise<any> {
		let wallet = await this.expenseService.createWallet({
			name: data.name,
			order: data.order,
			owner_id: data.owner_id,
			initial_balance: data.initial_balance,
		})

		return wallet
	}
}
