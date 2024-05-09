import { Module } from '@nestjs/common';
import { WebhookController } from './webhook/webhook.controller';

@Module({
  controllers: [WebhookController],
  exports: [WebhookController],
  providers: [WebhookController],
})
export class WebhookModule {}
