import { IdentityMicroservice } from 'src/microservices/identity/identity.service';
export declare class IdentityService {
    private identityMicroservice;
    constructor(identityMicroservice: IdentityMicroservice);
    register(): Promise<any>;
}
