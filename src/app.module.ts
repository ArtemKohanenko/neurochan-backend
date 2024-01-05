import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from './post/post.module';
import { Post } from './post/post.entity';
import { Thread } from './thread/thread.entity';
import { ThreadController } from './thread/thread.controller';
import { ThreadModule } from './thread/thread.module';

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
    PostModule,
    ThreadModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}