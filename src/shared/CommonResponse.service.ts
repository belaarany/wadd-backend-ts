import { Inject, Injectable } from '@nestjs/common';
import { Client, ClientProxy, ClientRedis, Transport } from '@nestjs/microservices';

@Injectable()
export class CommonResponseFactory {
	create<T>(data: T): CommonResponse<T> {
		return {
			success: true,
			data: {
				...data,
			}
		}
	}
}

export interface CommonResponse<T> {
	success: boolean,
	data: T,
}