// src/email/email.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter = nodemailer.createTransport({
    service: 'gmail', // Use your preferred service
    auth: {
      user: 'your-email@gmail.com',
      pass: 'password',
    },
  });

  async sendEmail(config: { to: string; subject: string; text: string }) {
    console.log(config);
    console.log('Data sent');
    return;
    const mailOptions = {
      from: 'your-email@gmail.com',
      to: config.to,
      subject: config.subject,
      text: config.text,
    };
    await this.transporter.sendMail(mailOptions);
  }
}
