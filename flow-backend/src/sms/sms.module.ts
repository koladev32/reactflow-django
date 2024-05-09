import { Module } from '@nestjs/common';
import { SmsService } from './sms/sms.service';

@Module({
  providers: [SmsService],
})
export class SmsModule {}
