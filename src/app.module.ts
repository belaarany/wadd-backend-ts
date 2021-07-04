import { Module } from '@nestjs/common';
import { ExpenseModule } from './modules/expense/expense.module';
import { IdentityModule } from './modules/identity/identity.module';

@Module({
  imports: [IdentityModule, ExpenseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
