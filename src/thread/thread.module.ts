import { ConsoleLogger, Module } from '@nestjs/common';
import { ThreadController } from './thread.controller';
import { ThreadService } from './thread.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Thread } from './thread.entity';
import { Post } from 'src/post/post.entity';
import { BotService } from 'src/bot/bot.service';
import { BotModule } from 'src/bot/bot.module';
import { IdService } from 'src/id/id.service';
import { IdModule } from 'src/id/id.module';

@Module({
  controllers: [ThreadController],
  providers: [ThreadService],
  imports: [TypeOrmModule.forFeature([Thread]), IdModule, BotModule],
  exports: [ThreadService]
})
export class ThreadModule {}
