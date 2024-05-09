// src/edge/edge.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { EdgeService } from '../../workflow.service';
import { EdgeDTO } from '../../dto/workflow.dto';

@Controller('edges')
export class EdgeController {
  constructor(private readonly edgeService: EdgeService) {}

  @Post()
  async createEdge(@Body() edgeDto: EdgeDTO) {
    return this.edgeService.createEdge(edgeDto);
  }
}
