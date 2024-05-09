import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Node } from './node.entity';

@Entity()
export class Workflow {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Node, (node) => node.workflow) // One workflow has many nodes
  nodes: Node[];
}
