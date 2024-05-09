import { Module } from '@nestjs/common';
import { EmailService } from './email/email.service';

@Module({
  providers: [EmailService],
})
export class EmailModule {}
