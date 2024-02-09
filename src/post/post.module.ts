import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { ThreadService } from 'src/thread/thread.service';
import { ThreadModule } from 'src/thread/thread.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Thread } from 'src/thread/thread.entity';
import { Post } from './post.entity';
import { BotService } from 'src/bot/bot.service';
import { BotModule } from 'src/bot/bot.module';
import { IdService } from 'src/id/id.service';
import { IdModule } from 'src/id/id.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [TypeOrmModule.forFeature([Thread, Post]), IdModule, BotModule, HttpModule],
  exports: [PostService]
})
export class PostModule {}
