import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EdgeService, NodeService } from './workflow/workflow.service';
import { FlowExecutorService } from './workflow/flow-executor/flow-executor.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const nodeService = app.get(NodeService);
  const edgeService = app.get(EdgeService);
  const flowExecutorService = app.get(FlowExecutorService);

  // Create nodes
  const webhookNode = await nodeService.createNode({
    type: 'webhook',
    config: { webhookId: 'startWorkflow123' },
  });
  const emailNode = await nodeService.createNode({
    type: 'email',
    config: {
      to: '{{email}}', // Placeholder to be replaced with actual email from trigger data
      subject: 'Hello from the Workflow',
      body: '{{message}}', // Placeholder to be replaced with actual message from trigger data
    },
  });
  const smsNode = await nodeService.createNode({
    type: 'sms',
    config: {
      phoneNumber: '{{phone}}', // Placeholder to be replaced with actual phone number from trigger data
      message: 'Your process is complete.',
    },
  });

  // Create edges
  await edgeService.createEdge({
    sourceNodeId: webhookNode.id,
    targetNodeId: emailNode.id,
  });
  await edgeService.createEdge({
    sourceNodeId: emailNode.id,
    targetNodeId: smsNode.id,
  });

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

  console.log('Workflow executed successfully!');
  await app.close();
}

bootstrap();
