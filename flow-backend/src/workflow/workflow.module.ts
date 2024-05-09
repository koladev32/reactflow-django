// src/workflow/workflow.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EdgeService, NodeService, WorkflowService } from './workflow.service';
import { Workflow } from './workflow.entity';
import { Edge, Node } from './node.entity';
import { FlowExecutorService } from './flow-executor/flow-executor.service';
import { EmailModule } from '../email/email.module';
import { SmsModule } from '../sms/sms.module';
import { CallbackModule } from '../callback/callback.module';
import { WorkflowController } from './controllers/workflow/workflow.controller';
import { NodeController } from './controllers/node/node.controller';
import { EdgeController } from './controllers/edge/edge.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Workflow, Node, Edge]),
    EmailModule,
    SmsModule,
    CallbackModule,
  ],
  providers: [WorkflowService, EdgeService, NodeService, FlowExecutorService],
  exports: [WorkflowService, EdgeService, NodeService, FlowExecutorService],
  controllers: [WorkflowController, NodeController, EdgeController], // Export the service if it needs to be used outside this module
})
export class WorkflowModule {}
