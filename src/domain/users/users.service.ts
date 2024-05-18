import { Injectable } from "@nestjs/common"
import { UserEntity } from "./schemas/user.entity"
import { UsersRepository } from "./users.repository"

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}

  async findById(id: string): Promise<UserEntity> {
    const user = await this.usersRepo.findOneBy({ id })

    return user
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.usersRepo.findOneBy({ email })

    return user
  }
}
