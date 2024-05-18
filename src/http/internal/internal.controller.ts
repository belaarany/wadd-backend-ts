import { Controller, Post, Request, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common"
import { FileFieldsInterceptor } from "@nestjs/platform-express"
import { parse } from "csv-parse/sync"
import { Internal } from "src/core/decorators/internal.decorator"
import { Currency } from "src/core/interfaces/enums/Currency"
import { WalletType } from "src/core/interfaces/enums/WalletType"
import { CategoriesService } from "src/domain/categories/categories.service"
import { ExpensesService } from "src/domain/expenses/expenses.service"
import { IncomesService } from "src/domain/incomes/incomes.service"
import { TransfersService } from "src/domain/transfers/transfers.service"
import { WalletsService } from "src/domain/wallets/wallets.service"
import { JwtAuthGuard } from "src/services/auth/jwt-auth.guard"

@Controller("internal")
export class InternalController {
  constructor(
    private readonly walletsService: WalletsService,
    private readonly categoriesService: CategoriesService,
    private readonly incomesService: IncomesService,
    private readonly expensesService: ExpensesService,
    private readonly transfersService: TransfersService,
  ) {}

  @Post("import-supabase")
  @Internal()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: "wallets", maxCount: 1 },
      { name: "categories", maxCount: 1 },
      { name: "incomes", maxCount: 1 },
      { name: "expenses", maxCount: 1 },
      { name: "transfers", maxCount: 1 },
    ]),
  )
  async importSupabase(
    @UploadedFiles()
    files: {
      wallets: Express.Multer.File[]
      categories: Express.Multer.File[]
      incomes: Express.Multer.File[]
      expenses: Express.Multer.File[]
      transfers: Express.Multer.File[]
    },
    @Request() req,
  ): Promise<any> {
    const walletsFile = files.wallets[0]
    const categoriesFile = files.categories[0]
    const incomesFile = files.incomes[0]
    const expensesFile = files.expenses[0]
    const transfersFile = files.transfers[0]

    const walletsCsv = parse(walletsFile.buffer, { columns: true, skip_empty_lines: true })
    const categoriesCsv = parse(categoriesFile.buffer, { columns: true, skip_empty_lines: true })
    const incomesCsv = parse(incomesFile.buffer, { columns: true, skip_empty_lines: true })
    const expensesCsv = parse(expensesFile.buffer, { columns: true, skip_empty_lines: true })
    const transfersCsv = parse(transfersFile.buffer, { columns: true, skip_empty_lines: true })

    const walletIdMappping = {}
    const categoryIdMappping = {}

    for (const walletCsv of walletsCsv) {
      const wallet = await this.walletsService.create({
        name: walletCsv.name,
        owner_user_id: req.user.id,
        initial_balance: walletCsv.initial_balance,
        order: walletCsv.order,

        type: WalletType.CASH,
        default_currency: Currency.HUF,
        color_hex: "#000000",
        icon_url: "N/A",
      })

      walletIdMappping[walletCsv.id] = wallet.id
    }

    for (const categoryCsv of categoriesCsv) {
      const category = await this.categoriesService.create({
        name: categoryCsv.name,
        owner_user_id: req.user.id,
        color: categoryCsv.color,
        icon: categoryCsv.icon,
        parent_category_id: null,
      })

      categoryIdMappping[categoryCsv.id] = category.id
    }

    for (const incomeCsv of incomesCsv) {
      const walletId = walletIdMappping[incomeCsv.wallet_id]
      const categoryId = categoryIdMappping[incomeCsv.category_id]

      if (!walletId || !categoryId) {
        console.log("Skipping income", incomeCsv)
        continue
      }

      await this.incomesService.create({
        amount: incomeCsv.amount,
        currency: Currency.HUF,
        timestamp: incomeCsv.timestamp,
        note: incomeCsv.note,
        wallet_id: walletId,
        category_id: categoryId,
        group_id: null,
        attachment_file_ids: [],
        location: null,
        related_expense_ids: [],
        tags: [],
      })
    }

    for (const expenseCsv of expensesCsv) {
      const walletId = walletIdMappping[expenseCsv.wallet_id]
      const categoryId = categoryIdMappping[expenseCsv.category_id]

      if (!walletId || !categoryId) {
        console.log("Skipping expense", expenseCsv)
        continue
      }

      await this.expensesService.create({
        amount: expenseCsv.amount,
        currency: Currency.HUF,
        timestamp: expenseCsv.timestamp,
        note: expenseCsv.note,
        wallet_id: walletId,
        category_id: categoryId,
      })
    }

    for (const transferCsv of transfersCsv) {
      const fromWalletId = walletIdMappping[transferCsv.source_wallet_id]
      const toWalletId = walletIdMappping[transferCsv.target_wallet_id]

      if (!fromWalletId || !toWalletId) {
        console.log("Skipping transfer", transferCsv)
        continue
      }

      await this.transfersService.create({
        amount: transferCsv.amount,
        source_wallet_id: fromWalletId,
        target_wallet_id: toWalletId,
        note: transferCsv.note,
        timestamp: transferCsv.timestamp,
      })
    }

    return {
      walletIdMappping,
      categoryIdMappping,
    }
  }
}
