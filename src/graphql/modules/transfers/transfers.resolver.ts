import { HttpException, HttpStatus, UseGuards } from "@nestjs/common"
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql"
import { AuthUser, Authorization } from "src/core/decorators/auth.decorator"
import { WalletNotExistsException } from "src/core/exceptions/walletNotExists.exception"
import { AuthGuard } from "src/core/guards/auth.guard"
import { Transfer } from "src/domain/transfers/interfaces/transfer.model"
import { TransfersService } from "src/domain/transfers/transfers.service"
import { WalletEntity } from "src/domain/wallets/schemas/wallet.entity"
import { WalletsService } from "src/domain/wallets/wallets.service"
import { WalletsLoader } from "../../loaders/wallets.loader"
import { WalletGQLModel } from "../wallets/interfaces/wallet.model"
import { TransferGQLModel } from "./interfaces/transfer.model"
import { CreateTransferGQLInput } from "./interfaces/transfers.inputs"
import { TransferEntity } from "src/domain/transfers/schemas/transfer.entity"

@Resolver(() => TransferGQLModel)
export class TransfersResolver {
  constructor(
    private walletsService: WalletsService,
    private transfersService: TransfersService,
    private walletsLoader: WalletsLoader,
  ) {}

  @UseGuards(AuthGuard)
  @Mutation(() => TransferGQLModel, { name: "create_transfer" })
  async createTransfer(
    @Authorization() authUser: AuthUser,
    @Args("data") data: CreateTransferGQLInput,
  ): Promise<TransferEntity> {
    if ((await this.walletsService.exists(data.source_wallet_id)) === false) {
      throw new WalletNotExistsException(data.source_wallet_id)
    }

    if ((await this.walletsService.exists(data.target_wallet_id)) === false) {
      throw new WalletNotExistsException(data.target_wallet_id)
    }

    if (data.source_wallet_id === data.target_wallet_id) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `'source_wallet_id' and 'target_wallet_id' cannot be the same.`,
        },
        HttpStatus.BAD_REQUEST,
      )
    }

    const transfer = await this.transfersService.create(data)

    return transfer
  }

  @UseGuards(AuthGuard)
  @Query(() => [TransferGQLModel])
  async transfers(@Args("wallet_ids", { type: () => [String] }) walletIds: string[]): Promise<TransferEntity[]> {
    const incomes = await this.transfersService.listByWalletIds(walletIds)

    return incomes
  }

  @ResolveField(() => WalletGQLModel)
  async source_wallet(@Parent() parent: TransferGQLModel): Promise<WalletEntity> {
    const wallet = await this.walletsLoader.load(parent.source_wallet_id)

    return wallet
  }

  @ResolveField(() => WalletGQLModel)
  async target_wallet(@Parent() parent: TransferGQLModel): Promise<WalletEntity> {
    const wallet = await this.walletsLoader.load(parent.target_wallet_id)

    return wallet
  }
}
