import { Module } from "@nestjs/common"
import { UsersService } from "./users.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import { UserEntity } from "./schemas/user.entity"
import { UsersRepository } from "./users.repository"

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule {}
