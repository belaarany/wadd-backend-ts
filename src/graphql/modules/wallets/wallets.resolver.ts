import { UseGuards } from "@nestjs/common"
import { Args, Info, Mutation, Query, Resolver } from "@nestjs/graphql"
import { Authorization, AuthUser } from "src/core/decorators/auth.decorator"
import { AuthGuard } from "src/core/guards/auth.guard"
import { Wallet } from "src/domain/wallets/interfaces/wallet.model"
import { WalletsService } from "src/domain/wallets/wallets.service"
import { WalletGQLModel } from "./interfaces/wallet.model"
import { CreateWalletGQLInput, UpdateWalletGQLInput } from "./interfaces/wallets.inputs"

@Resolver(() => WalletGQLModel)
export class WalletsResolver {
  constructor(private walletsService: WalletsService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => WalletGQLModel)
  async createWallet(@Authorization() authUser: AuthUser, @Args("data") data: CreateWalletGQLInput): Promise<Wallet> {
    const wallet = await this.walletsService.create({
      name: data.name,
      order: data.order,
      owner_user_id: authUser.id,
      default_currency: data.default_currency,
      initial_balance: data.initial_balance,
      type: data.type,
      color_hex: data.color_hex,
      icon_url: data.icon_url,
    })

    return wallet
  }

  @UseGuards(AuthGuard)
  @Mutation(() => WalletGQLModel)
  async updateWallet(@Authorization() authUser: AuthUser, @Args("data") data: UpdateWalletGQLInput): Promise<Wallet> {
    const wallet = await this.walletsService.update(data.id, {
      name: data.name,
      order: data.order,
      default_currency: data.default_currency,
      initial_balance: data.initial_balance,
      type: data.type,
      color_hex: data.color_hex,
      icon_url: data.icon_url,
    })

    return wallet
  }

  @UseGuards(AuthGuard)
  @Mutation(() => String)
  async deleteWallet(@Authorization() authUser: AuthUser, @Args("walletId") walletId: string): Promise<string> {
    let deletedWalletId = await this.walletsService.delete(walletId)

    return deletedWalletId
  }

  @UseGuards(AuthGuard)
  @Query(() => [WalletGQLModel])
  async wallets(@Authorization() authUser: AuthUser, @Info() info): Promise<Wallet[]> {
    const wallets = await this.walletsService.listByUserId(authUser.id)

    console.log(info.fieldNodes[0].selectionSet.selections.map((item) => item.name.value))

    return wallets
  }

  // @UseGuards(AuthGuard)
  // @Query(() => BalanceGQLModel)
  // async balances(@Authorization() authUser: AuthUser): Promise<any> {
  // 	const balances = await this.expenseMicroserviceWalletsService.getBalances(["wal_XZrrpjiQk7VI3eL7", "wal_kCqOXOLFlGcyVkHIm2", "wal_kCqOXOLFlGcyVkHIm"])
  //
  // 	return balances
  // }

  // @ResolveField(() => WalletBalanceGQLModel)
  // async balance(
  // 	@Parent() parent: WalletGQLModel,
  // 	@Loader(BalancesLoader) categoriesLoader: DataLoader<string, any>,
  // ): Promise<any> {
  // 	const balance = await categoriesLoader.load(parent.id)

  // 	return balance
  // }
}
