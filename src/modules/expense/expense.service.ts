import { Inject, Injectable } from '@nestjs/common';
import { ExpenseMicroservice } from 'src/microservices/expense/expense.service';
import { CommonResponse } from 'src/shared/CommonResponse.service';

@Injectable()
export class ExpenseService {
	constructor(
		private expenseMicroservice: ExpenseMicroservice
	) { }

	async createWallet(idx: number = 0): Promise<any> {
		let wallet = await this.expenseMicroservice.createWallet(idx)

		return {
			wallet: wallet,
		}
	}
}
