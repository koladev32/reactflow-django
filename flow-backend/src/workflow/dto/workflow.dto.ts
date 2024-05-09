import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Workflow } from '../workflow.entity';
import { READONLY } from 'sqlite3';

export class WorkflowDTO {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class NodeDTO {
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsOptional()
  config: any;

  @IsNumber()
  @IsOptional()
  workflowId?: number; // Optional to associate during creation or modification
}

export class EdgeDTO {
  @IsNumber()
  sourceNodeId: number;

  @IsNumber()
  targetNodeId: number;
}
