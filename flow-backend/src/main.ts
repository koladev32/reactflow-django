// src/main.ts or a separate script file
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  EdgeService,
  NodeService,
  WorkflowService,
} from './workflow/workflow.service';
import { FlowExecutorService } from './workflow/flow-executor/flow-executor.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const workflowService = app.get(WorkflowService);
  const nodeService = app.get(NodeService);
  const edgeService = app.get(EdgeService);
  const executorService = app.get(FlowExecutorService);

  // Create a workflow
  const workflow = await workflowService.createWorkflow({
    name: 'Sample Workflow',
  });

  // Create nodes
  const node1 = await nodeService.createNode({
    type: 'start',
    workflowId: workflow.id,
  });
  const node2 = await nodeService.createNode({
    type: 'process',
    workflowId: workflow.id,
  });
  const node3 = await nodeService.createNode({
    type: 'end',
    workflowId: workflow.id,
  });

  // Create edges
  await edgeService.createEdge({
    sourceNodeId: node1.id,
    targetNodeId: node2.id,
  });
  await edgeService.createEdge({
    sourceNodeId: node2.id,
    targetNodeId: node3.id,
  });

  // Execute the workflow from the start node
  await executorService.executeWorkflow(node1.id);

  await app.close();
}

bootstrap();
