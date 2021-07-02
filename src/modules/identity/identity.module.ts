import { Module } from '@nestjs/common';
import { IdentityService } from './identity.service';
import { IdentityController } from './identity.controller';
import { CommonResponseModule } from 'src/shared/CommonResponse.module';
import { IdentityMicroserviceModule } from 'src/microservices/identity/identity.module';
import { IdentityMicroservice } from 'src/microservices/identity/identity.service';

@Module({
	imports: [IdentityMicroserviceModule, CommonResponseModule],
	controllers: [IdentityController],
	providers: [IdentityService],
	exports: [],
})
export class IdentityModule { }
