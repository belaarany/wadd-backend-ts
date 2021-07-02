import { ClientProxy } from '@nestjs/microservices';
export declare class IdentityService {
    private client;
    constructor(client: ClientProxy);
    register(): Promise<string>;
}
