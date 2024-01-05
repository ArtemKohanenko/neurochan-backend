import { Thread } from 'src/thread/thread.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  post_id: number;

  @Column()
  text: string;

  @Column()
  date: Date;

  @Column()
  thread_id: number;
}
