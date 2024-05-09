// src/workflow/workflow.controller.ts
import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { WorkflowService } from '../../workflow.service';
import { WorkflowDTO } from '../../dto/workflow.dto';

@Controller('workflow')
export class WorkflowController {
  constructor(private readonly workflowService: WorkflowService) {}

  @Post()
  async createWorkflow(@Body() workflowDto: WorkflowDTO) {
    return this.workflowService.createWorkflow(workflowDto);
  }

  @Get()
  async getAllWorkflows() {
    return this.workflowService.getAllWorkflows();
  }

  @Get(':id')
  async getWorkflow(@Param('id') id: string) {
    const workflowData = await this.workflowService.getWorkflowForReactFlow(
      +id,
    );
    if (!workflowData) {
      return { status: 'error', message: 'Workflow not found' };
    }
    return workflowData;
  }
}
