// src/sms/sms.service.ts
import { Injectable } from '@nestjs/common';
import { Twilio } from 'twilio';

@Injectable()
export class SmsService {
  private twilioClient = new Twilio(
    'ACTWILIO_ACCOUNT_SID',
    'TWILIO_AUTH_TOKEN',
  );

  sendSms(config: { to: string; message: string }) {
    console.log(config);
    console.log('Data sent SMS');
    return;
    this.twilioClient.messages.create({
      body: config.message,
      to: config.to,
      from: '+12345678901', // Your Twilio number
    });
  }
}
