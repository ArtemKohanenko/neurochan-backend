import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { ThreadService } from 'src/thread/thread.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Thread } from 'src/thread/thread.entity';
import { Post } from 'src/post/post.entity';
import { PostService } from 'src/post/post.service';
import { PostModule } from 'src/post/post.module';
import { ThreadModule } from 'src/thread/thread.module';
import { IdModule } from 'src/id/id.module';

@Module({
  providers: [BotService, ThreadService, PostService],
  imports: [TypeOrmModule.forFeature([Thread, Post]), IdModule],
  exports: [BotService]
})
export class BotModule {}
