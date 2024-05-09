import { Module } from '@nestjs/common';
import { CallbackService } from './callback/callback.service';

@Module({
  providers: [CallbackService],
  exports: [CallbackService],
})
export class CallbackModule {}
