// src/node/node.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { NodeService } from '../../workflow.service';
import { NodeDTO } from '../../dto/workflow.dto';
@Controller('node')
export class NodeController {
  constructor(private readonly nodeService: NodeService) {}

  @Post()
  async createNode(@Body() nodeDto: NodeDTO) {
    return this.nodeService.createNode(nodeDto);
  }
}
