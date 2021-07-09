import { Inject, Injectable } from '@nestjs/common';
import { Wallet } from 'src/interfaces/wallet.interface';
import { ExpenseMicroservice } from 'src/microservices/expense/expense.service';
import { CommonResponse } from 'src/shared/CommonResponse.service';
import { CreateWalletDTO } from './expense.dto';

@Injectable()
export class ExpenseService {
	constructor(
		private expenseMicroservice: ExpenseMicroservice,
	) { }

	async createWallet(walletData: CreateWalletDTO): Promise<Wallet> {
		let wallet = await this.expenseMicroservice.createWallet(walletData)

		return wallet
	}
}
