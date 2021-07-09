import { Inject, Injectable } from '@nestjs/common';
import { Client, ClientProxy, ClientRedis, Transport } from '@nestjs/microservices';
import { Wallet } from 'src/interfaces/wallet.interface';
import { CreateWalletDTO } from './expense.dto';

@Injectable()
export class ExpenseMicroservice {
	constructor(
		@Inject('EXPENSE_SERVICE') private client: ClientProxy,
	) { }

	async createWallet(walletData: CreateWalletDTO): Promise<Wallet> {
		const response = await this.client.send("create-wallet", { wallet: walletData }).toPromise()
		return response
	}
}
