import { Thread } from 'src/thread/thread.entity';
import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';

@Entity()
export class Post {
  @PrimaryColumn()
  postId: number;

  @Column()
  text: string;

  @Column()
  date: Date;

  @ManyToOne(() => Thread, (thread) => thread.posts)
    thread: Thread
}
