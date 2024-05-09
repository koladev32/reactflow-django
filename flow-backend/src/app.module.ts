import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebhookModule } from './webhook/webhook.module';
import { EmailModule } from './email/email.module';
import { SmsModule } from './sms/sms.module';
import { TypeOrmModule } from '@nestjs/typeorm/dist';

import { Workflow } from './workflow/workflow.entity';
import { Edge } from './workflow/node.entity';
import { Node } from './workflow/node.entity';
import { WorkflowModule } from './workflow/workflow.module';

@Module({
  imports: [
    WebhookModule,
    EmailModule,
    SmsModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db/sql',
      synchronize: true,
      entities: [Workflow, Node, Edge],
    }),
    WorkflowModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
