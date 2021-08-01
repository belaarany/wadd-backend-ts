import { Inject, Injectable } from "@nestjs/common"
import { ClientProxy } from "@nestjs/microservices"
import { CreateLogDTO } from "./log.dto"

@Injectable()
export class LogMicroservice {
	constructor(@Inject("LOG_SERVICE") private client: ClientProxy) {}

	async createLog(logData: CreateLogDTO): Promise<void> {
		await this.client.send("create-log", { log: logData }).toPromise()
		return
	}
}
