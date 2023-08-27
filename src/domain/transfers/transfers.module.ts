import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { TransferEntity } from "./schemas/transfer.entity"
import { TransfersRepository } from "./transfers.repository"
import { TransfersService } from "./transfers.service"

@Module({
  imports: [TypeOrmModule.forFeature([TransferEntity])],
  controllers: [],
  providers: [TransfersService, TransfersRepository],
  exports: [TransfersService],
})
export class TransfersModule {}
