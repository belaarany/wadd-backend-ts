import { ClientProxy } from '@nestjs/microservices';
export declare class IdentityMicroservice {
    private client;
    constructor(client: ClientProxy);
    register(): Promise<any>;
}
