import { Module } from "@nestjs/common"
import { ClientsModule, Transport } from "@nestjs/microservices"
import { LogMicroservice } from "./log.service"

@Module({
	imports: [
		ClientsModule.register([
			{
				name: "LOG_SERVICE",
				transport: Transport.RMQ,
				options: {
					urls: ["amqp://localhost:5672"],
					queue: "wadd_log_queue",
					queueOptions: {
						durable: false,
					},
				},
			},
		]),
	],
	providers: [LogMicroservice],
	exports: [LogMicroservice],
})
export class LogMicroserviceModule {}
