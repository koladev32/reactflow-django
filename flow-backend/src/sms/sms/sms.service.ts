// src/sms/sms.service.ts
import { Injectable } from '@nestjs/common';
import { Twilio } from 'twilio';

@Injectable()
export class SmsService {
  private twilioClient = new Twilio(
    'ACTWILIO_ACCOUNT_SID',
    'TWILIO_AUTH_TOKEN',
  );

  sendSms(to: string, message: string) {
    this.twilioClient.messages.create({
      body: message,
      to: to,
      from: '+12345678901', // Your Twilio number
    });
  }
}
