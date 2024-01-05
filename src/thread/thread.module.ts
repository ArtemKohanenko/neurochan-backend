import { ConsoleLogger, Module } from '@nestjs/common';
import { ThreadController } from './thread.controller';
import { ThreadService } from './thread.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Thread } from './thread.entity';
import { Post } from 'src/post/post.entity';

@Module({
  controllers: [ThreadController],
  providers: [ThreadService],
  imports: [TypeOrmModule.forFeature([Thread, Post])]
})
export class ThreadModule {}
