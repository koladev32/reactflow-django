import { Injectable } from '@nestjs/common';
import { EdgeService, NodeService } from '../workflow.service';
import { EmailService } from '../../email/email/email.service';
import { SmsService } from '../../sms/sms/sms.service';
import { Node } from '../node.entity';
import { CallbackService } from '../../callback/callback/callback.service';

@Injectable()
export class FlowExecutorService {
  constructor(
    private nodeService: NodeService,
    private edgeService: EdgeService,
    private emailService: EmailService, // Assume these services exist
    private smsService: SmsService,
    private callbackService: CallbackService,
  ) {}

  async executeWorkflow(startNodeId: number): Promise<void> {
    let currentNode = await this.nodeService.getNodeById(startNodeId);

    while (currentNode) {
      console.log(
        `Executing node: ${currentNode.id} of type ${currentNode.type}`,
      );

      const outgoingEdges = await this.edgeService.getEdgesBySourceNodeId(
        currentNode.id,
      );

      if (!outgoingEdges.length) {
        console.log('End of workflow reached.');
        break;
      }

      // For simplicity, assume there is only one outgoing edge
      console.log(outgoingEdges);
      const nextNodeEdge = outgoingEdges[0];
      currentNode = await this.nodeService.getNodeById(
        nextNodeEdge.targetNode.id,
      );
    }
  }

  async executeNode(node: Node, triggerData: any): Promise<void> {
    switch (node.type) {
      case NodeType.EMAIL:
        await this.emailService.sendEmail({
          ...node.config,
          ...triggerData,
        });
        break;
      case NodeType.SMS:
        await this.smsService.sendSms({ ...node.config, ...triggerData });
        break;
      case NodeType.CALLBACK:
        await this.callbackService.sendRequest({ ...node.config });
        break;
      default:
        console.log('Unsupported node type');
    }

    // Proceed to next node
    let outgoingEdges = await this.edgeService.getEdgesBySourceNodeId(node.id);
    if (outgoingEdges.length > 0) {
      // Assume one outgoing edge for simplicity
      let nextNode = await this.nodeService.getNodeById(
        outgoingEdges[0].targetNode.id,
      );
      await this.executeNode(nextNode, { ...triggerData });
    }
  }

  async executeWorkflowFromStartNode(
    startNodeId: number,
    triggerData: any,
  ): Promise<void> {
    const startNode = await this.nodeService.getNodeById(startNodeId);
    if (!startNode) {
      throw new Error('Start node not found');
    }
    await this.executeNode(startNode, { ...triggerData });
  }
}
