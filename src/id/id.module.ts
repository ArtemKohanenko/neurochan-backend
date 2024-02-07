import { Module } from '@nestjs/common';
import { IdService } from './id.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostService } from 'src/post/post.service';
import { Thread } from 'src/thread/thread.entity';
import { Post } from 'src/post/post.entity';

@Module({
    providers: [IdService],
    imports: [TypeOrmModule.forFeature([Thread, Post])],
    exports: [IdService]
})
export class IdModule {}
