import { Injectable, Scope } from "@nestjs/common"
import * as DataLoader from "dataloader"
import { sortBy } from "lodash"

export interface INestDataLoader<TEntity> {
  generateDataLoader(): DataLoader<string, TEntity>
}

@Injectable({
  scope: Scope.REQUEST,
})
export abstract class NestDataLoader<TEntity> {
  protected dataLoader: DataLoader<string, TEntity>

  load(id: string): Promise<TEntity> {
    return this.dataLoader.load(id)
  }

  loadMany(ids: string[]): Promise<TEntity[]> {
    return this.dataLoader.loadMany(ids) as Promise<TEntity[]>
  }
}
