import { Injectable } from "@nestjs/common"

@Injectable()
export class AuthService {
  // constructor(private identityMicroservice: IdentityMicroservice) {}

  async register(): Promise<any> {
    // const user = await this.identityMicroservice.register()

    return {
      id: 0,
    }
  }
}
