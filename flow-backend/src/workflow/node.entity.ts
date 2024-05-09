import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Workflow } from './workflow.entity';

@Entity()
export class Node {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @ManyToOne(() => Workflow, (workflow) => workflow.nodes, {
    onDelete: 'CASCADE', // Ensures all nodes are deleted if the workflow is deleted
  })
  workflow: Workflow;

  @OneToMany(() => Edge, (edge) => edge.sourceNode)
  outgoingEdges: Edge[];

  @OneToMany(() => Edge, (edge) => edge.targetNode)
  incomingEdges: Edge[];
}

@Entity()
export class Edge {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Node, (node) => node.outgoingEdges, { onDelete: 'CASCADE' })
  sourceNode: Node;

  @ManyToOne(() => Node, (node) => node.incomingEdges, { onDelete: 'CASCADE' })
  targetNode: Node;
}
