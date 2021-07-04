import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ExpenseMicroservice } from './expense.service';

@Module({
	imports: [
		ClientsModule.register([
			{
				name: 'EXPENSE_SERVICE',
				transport: Transport.RMQ,
				options: {
					urls: ['amqp://localhost:5672'],
					queue: 'wadd_expense_queue',
					queueOptions: {
						durable: false
					},
				},
			},
		]),
	],
	providers: [ExpenseMicroservice],
	exports: [ExpenseMicroservice],
})
export class ExpenseMicroserviceModule { }
