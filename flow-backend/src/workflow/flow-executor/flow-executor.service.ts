import { Injectable } from '@nestjs/common';
import { EdgeService, NodeService } from '../workflow.service';

@Injectable()
export class FlowExecutorService {
  constructor(
    private nodeService: NodeService,
    private edgeService: EdgeService,
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
}
