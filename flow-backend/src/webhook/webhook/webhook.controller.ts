// src/webhooks/webhook.controller.ts
import { NodeService, WorkflowService } from '../../workflow/workflow.service';
import { FlowExecutorService } from '../../workflow/flow-executor/flow-executor.service';
import { Controller, Post, Req, Res, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('webhook')
export class WebhookController {
  constructor(
    private workflowService: WorkflowService,
    private nodeService: NodeService,
    private flowExecutorService: FlowExecutorService,
  ) {}

  @Post(':webhookId')
  async receiveWebhook(@Req() req: Request, @Res() res: Response) {
    const webhookId = req.params.webhookId;
    const workflow = await this.nodeService.findWorkflowByWebhookId(webhookId);

    if (!workflow) {
      res
        .status(HttpStatus.NOT_FOUND)
        .send('Workflow not found for the provided webhook ID');
      return;
    }

    const triggerData = req.body; // Extract data from webhook body or headers as needed
    await this.flowExecutorService.executeWorkflowFromStartNode(
      workflow.nodes[0].id,
      triggerData,
    );
    res.status(HttpStatus.OK).send('Workflow triggered successfully');
  }
}
