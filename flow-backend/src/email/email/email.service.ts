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

  async sendEmail(to: string, subject: string, text: string) {
    const mailOptions = {
      from: 'your-email@gmail.com',
      to: to,
      subject: subject,
      text: text,
    };
    await this.transporter.sendMail(mailOptions);
  }
}
