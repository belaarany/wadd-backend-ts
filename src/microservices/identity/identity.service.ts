import { Inject, Injectable } from '@nestjs/common';
import { Client, ClientProxy, ClientRedis, Transport } from '@nestjs/microservices';
import { CommonResponse } from 'src/shared/CommonResponse.service';


@Injectable()
export class IdentityMicroservice {
	constructor(
		@Inject('IDENTITY_SERVICE') private client: ClientProxy,
	) { }

	async register(): Promise<any> {
		// const response = await this.client.send("auth:login", { exampledata: 123 }).toPromise();
		// return response;

		return {
			id: 123,
		}
	}
}
