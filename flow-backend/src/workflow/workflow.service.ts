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
    const workflow = await this.workflowRepository.create(dto);
    return await this.workflowRepository.save(workflow);
  }

  async getAllWorkflows(): Promise<Workflow[]> {
    return await this.workflowRepository.find({
      relations: ['nodes', 'nodes.outgoingEdges', 'nodes.incomingEdges'],
    });
  }

  async getWorkflowById(workflowId: number): Promise<Workflow> {
    return await this.workflowRepository.findOne({
      where: {
        id: workflowId,
      },
      relations: ['nodes', 'nodes.outgoingEdges', 'nodes.incomingEdges'],
    });
  }

  async getWorkflowForReactFlow(id: number): Promise<any> {
    const workflow = await this.getWorkflowById(id);
    if (!workflow) return null;

    const nodes = workflow.nodes.map((node) => ({
      id: String(node.id),
      type: node.type,
      data: { label: `${node.type} Node`, ...node.config },
      position: { x: Math.random() * 400, y: Math.random() * 400 }, // Random for example, should be calculated or fixed
    }));

    const edges = workflow.nodes.flatMap((node) =>
      node.outgoingEdges.map((edge) => ({
        id: String(edge.id),
        source: edge.sourceNode ? edge.sourceNode?.id : null,
        target: edge.targetNode ? edge.targetNode?.id : null,
        animated: true,
        label: 'Edge',
      })),
    );

    return { name: workflow.name, nodes, edges };
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
    let workflow;
    if (dto.workflowId) {
      workflow = await this.workflowService.getWorkflowById(dto.workflowId);
      if (!workflow) {
        throw new NotFoundException(
          `Workflow with ID ${dto.workflowId} not found`,
        );
      }
    }

    const node = this.nodeRepository.create({
      ...dto,
      workflow: workflow,
    });
    await this.nodeRepository.save(node);
    return await this.nodeRepository.findOne({
      where: { id: node.id },
      relations: ['workflow'], // Ensure the workflow is loaded
    });
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

    const edge = await this.edgeRepository.create({
      ...dto,
      sourceNode: sourceNode,
      targetNode: targetNode,
    });
    return await this.edgeRepository.save(edge);
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
