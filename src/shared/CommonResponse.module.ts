import { Module } from '@nestjs/common';
import { CommonResponse, CommonResponseFactory } from './CommonResponse.service';

@Module({
  imports: [],
  controllers: [],
  providers: [CommonResponseFactory],
  exports: [CommonResponseFactory],
})
export class CommonResponseModule {}
