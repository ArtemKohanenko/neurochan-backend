import { Post } from 'src/post/post.entity';
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';

@Entity()
export class Thread {
  @PrimaryColumn()
  threadId: number;

  @Column()
  text: string;

  @Column()
  date: Date;

  @Column()
  lastActivityDate: Date;

  @OneToMany(() => Post, (post) => post.thread)
  posts: Post[];
}
