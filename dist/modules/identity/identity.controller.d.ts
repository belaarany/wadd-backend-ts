import { CommonResponse, CommonResponseFactory } from 'src/shared/CommonResponse.service';
import { RegisterRequest, RegisterResponse } from './identity.dto';
import { IdentityService } from './identity.service';
export declare class IdentityController {
    private res;
    private identityService;
    constructor(res: CommonResponseFactory, identityService: IdentityService);
    register(registerDto: RegisterRequest): Promise<CommonResponse<RegisterResponse>>;
}
