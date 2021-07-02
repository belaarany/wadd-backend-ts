import { CommonResponse, CommonResponseFactory } from 'src/shared/CommonResponse.service';
import { RegisterRequest, RegisterResponse } from './identity.dto';
export declare class IdentityController {
    private res;
    constructor(res: CommonResponseFactory);
    register(registerDto: RegisterRequest): CommonResponse<RegisterResponse>;
}
