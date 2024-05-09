import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  EdgeService,
  NodeService,
  WorkflowService,
} from './workflow/workflow.service';
import { FlowExecutorService } from './workflow/flow-executor/flow-executor.service';
import { Workflow } from './workflow/workflow.entity';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const nodeService = app.get(NodeService);
  const workflowService = app.get(WorkflowService);
  const edgeService = app.get(EdgeService);
  const flowExecutorService = app.get(FlowExecutorService);

  const workflow = await workflowService.createWorkflow({
    name: 'Testing',
  });

  // Create nodes
  const webhookNode = await nodeService.createNode({
    type: 'webhook',
    config: { webhookId: 'startWorkflow123' },
    workflowId: workflow.id,
  });
  const emailNode = await nodeService.createNode({
    type: 'email',
    config: {
      to: '{{email}}', // Placeholder to be replaced with actual email from trigger data
      subject: 'Hello from the Workflow',
      body: '{{message}}', // Placeholder to be replaced with actual message from trigger data
    },
    workflowId: workflow.id,
  });
  const smsNode = await nodeService.createNode({
    type: 'sms',
    config: {
      phoneNumber: '{{phone}}', // Placeholder to be replaced with actual phone number from trigger data
      message: 'Your process is complete.',
    },
    workflowId: workflow.id,
  });

  // Create edges
  const ed = await edgeService.createEdge({
    sourceNodeId: webhookNode.id,
    targetNodeId: emailNode.id,
  });
  const e = await edgeService.createEdge({
    sourceNodeId: emailNode.id,
    targetNodeId: smsNode.id,
  });

  console.log(ed, e);

  // Simulate incoming webhook data
  const triggerData = {
    email: 'user@example.com',
    phone: '+12345678901',
    message: 'This is a test message from webhook',
  };

  // Execute the workflow
  await flowExecutorService.executeWorkflowFromStartNode(
    webhookNode.id,
    triggerData,
  );

  await app.listen(4005);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
