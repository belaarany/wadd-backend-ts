import * as DataLoader from "dataloader"
import { Injectable } from "@nestjs/common"

// @Injectable()
// export class UsersLoader implements NestDataLoader<string, any> {
//   export class UsersLoader extends NestDataLoader<Category> implements INestDataLoader<Category> {
//   constructor(private identityMicroservice: IdentityMicroservice) {}

//   generateDataLoader(): DataLoader<string, any> {
//     return new DataLoader<string, any>((keys) => this.identityMicroservice.getUsers(keys as string[]))
//   }
// }
