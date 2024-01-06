import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { ThreadService } from 'src/thread/thread.service';
import { ThreadModule } from 'src/thread/thread.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Thread } from 'src/thread/thread.entity';
import { Post } from './post.entity';

@Module({
  controllers: [PostController],
  providers: [PostService, ThreadService],
  imports: [TypeOrmModule.forFeature([Thread, Post])]
})
export class PostModule {}
