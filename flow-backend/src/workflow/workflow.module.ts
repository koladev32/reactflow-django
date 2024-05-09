// src/workflow/workflow.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EdgeService, NodeService, WorkflowService } from './workflow.service';
import { Workflow } from './workflow.entity';
import { Edge, Node } from './node.entity';
import { FlowExecutorService } from './flow-executor/flow-executor.service';

@Module({
  imports: [TypeOrmModule.forFeature([Workflow, Node, Edge])],
  providers: [WorkflowService, EdgeService, NodeService, FlowExecutorService],
  exports: [WorkflowService, EdgeService, NodeService, FlowExecutorService], // Export the service if it needs to be used outside this module
})
export class WorkflowModule {}
