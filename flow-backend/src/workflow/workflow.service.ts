// src/workflow/workflow.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Edge, Node } from './node.entity';
import { EdgeDTO, NodeDTO, WorkflowDTO } from './dto/workflow.dto';
import { Workflow } from './workflow.entity';

@Injectable()
export class WorkflowService {
  constructor(
    @InjectRepository(Workflow)
    private workflowRepository: Repository<Workflow>,
  ) {}

  async createWorkflow(dto: WorkflowDTO): Promise<Workflow> {
    const workflow = this.workflowRepository.create(dto);
    return this.workflowRepository.save(workflow);
  }

  async getWorkflowById(workflowId: number): Promise<Workflow> {
    return await this.workflowRepository.findOneBy({
      id: workflowId,
    });
  }
}

@Injectable()
export class NodeService {
  constructor(
    @InjectRepository(Node)
    private nodeRepository: Repository<Node>,
    private workflowService: WorkflowService,
  ) {}

  async createNode(dto: NodeDTO): Promise<Node> {
    if (dto.workflowId) {
      const workflow = await this.workflowService.getWorkflowById(
        dto.workflowId,
      );
      if (!workflow) {
        throw new NotFoundException(
          `Workflow with ID ${dto.workflowId} not found`,
        );
      }
    }

    const node = this.nodeRepository.create(dto);
    return this.nodeRepository.save(node);
  }

  async getNodeById(nodeId: number): Promise<Node> {
    return await this.nodeRepository.findOneBy({ id: nodeId });
  }

  async findWorkflowByWebhookId(webhookId: string): Promise<Workflow | null> {
    const node = await this.nodeRepository.findOne({
      where: {
        type: 'webhook', // Assuming 'webhook' is the type for trigger nodes
        config: { webhookId: webhookId },
      },
      relations: ['workflow'],
    });

    return node ? node.workflow : null;
  }
}

@Injectable()
export class EdgeService {
  constructor(
    @InjectRepository(Edge)
    private edgeRepository: Repository<Edge>,
    private nodeService: NodeService,
  ) {}

  async createEdge(dto: EdgeDTO): Promise<Edge> {
    const sourceNode = await this.nodeService.getNodeById(dto.sourceNodeId);
    if (!sourceNode) {
      throw new NotFoundException(
        `Source Node with ID ${dto.sourceNodeId} not found`,
      );
    }

    const targetNode = await this.nodeService.getNodeById(dto.targetNodeId);
    if (!targetNode) {
      throw new NotFoundException(
        `Target Node with ID ${dto.targetNodeId} not found`,
      );
    }

    const edge = this.edgeRepository.create({
      ...dto,
      sourceNode: sourceNode,
      targetNode: targetNode,
    });
    return this.edgeRepository.save(edge);
  }

  // Method to fetch edges by source node ID
  async getEdgesBySourceNodeId(sourceNodeId: number): Promise<Edge[]> {
    return await this.edgeRepository.find({
      where: {
        sourceNode: { id: sourceNodeId },
      },
      relations: ['sourceNode', 'targetNode'],
    });
  }
}
