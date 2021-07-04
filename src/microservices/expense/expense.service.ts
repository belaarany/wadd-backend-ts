import { Inject, Injectable } from '@nestjs/common';
import { Client, ClientProxy, ClientRedis, Transport } from '@nestjs/microservices';

@Injectable()
export class ExpenseMicroservice {
	constructor(
		@Inject('EXPENSE_SERVICE') private client: ClientProxy,
	) { }

	async createWallet(idx: number = 1): Promise<any> {
		const response = await this.client.send("create-wallet", { idx }).toPromise();
		return response
	}
}
