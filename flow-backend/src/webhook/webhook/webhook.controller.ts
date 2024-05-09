// src/webhook/webhook.controller.ts
import { Controller, Post, Body } from '@nestjs/common';

@Controller('webhook')
export class WebhookController {
  @Post()
  handleWebhook(@Body() body: any): string {
    console.log(body); // Log the webhook payload for demonstration
    return 'Webhook received!';
  }
}
