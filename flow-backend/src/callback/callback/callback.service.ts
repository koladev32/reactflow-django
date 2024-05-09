// src/callback/callback.service.ts
import { Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig } from 'axios';

@Injectable()
export class CallbackService {
  constructor() {}

  async sendRequest(payload: {
    url: string;
    method: string;
    data: any;
    headers: any;
  }): Promise<any> {
    const config: AxiosRequestConfig = payload;

    try {
      const response = await axios(config);
      return response;
    } catch (error) {
      // Handle errors appropriately in your context
      console.error('Error making HTTP request:', error);
      throw error;
    }
  }
}
