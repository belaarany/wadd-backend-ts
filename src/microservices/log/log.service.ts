import { Inject, Injectable } from '@nestjs/common';
import { Client, ClientProxy, ClientRedis, Transport } from '@nestjs/microservices';
import { Wallet } from 'src/interfaces/wallet.interface';

@Injectable()
export class LogMicroservice {
	constructor(
		@Inject('LOG_SERVICE') private client: ClientProxy,
	) { }

	async createWallet(logData: any): Promise<any> {
		const response = await this.client.send("create-log", { log: logData }).toPromise()
		return response
	}
}
