import { ClientProxy } from '@nestjs/microservices';
export declare class AuthService {
    private client;
    constructor(client: ClientProxy);
    validateToken(): Promise<string>;
}
