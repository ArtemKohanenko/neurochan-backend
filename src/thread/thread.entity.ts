import { Post } from 'src/post/post.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Thread {
  @PrimaryGeneratedColumn()
  thread_id: number;

  @Column()
  text: string;

  @Column()
  date: Date;

  @Column()
  lastActivityDate: Date;

  @OneToMany(type => Post, post => post.thread_id)
  posts: Post[];
}
