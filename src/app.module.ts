import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from './post/post.module';
import { Post } from './post/post.entity';
import { Thread } from './thread/thread.entity';
import { ThreadController } from './thread/thread.controller';
import { ThreadModule } from './thread/thread.module';
import { BotModule } from './bot/bot.module';
import { ScheduleModule } from '@nestjs/schedule';
import { IdService } from './id/id.service';
import { IdModule } from './id/id.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({ 
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres', 
      database: 'postgres',
      entities: [Post, Thread], 
      synchronize: true,
      autoLoadEntities: true, 
    }),
    ScheduleModule.forRoot(),
    PostModule,
    ThreadModule,
    BotModule,
    IdModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
