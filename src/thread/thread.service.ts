import { Injectable } from '@nestjs/common';
import { CreateThreadDto } from './dto/create.thread.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Thread } from './thread.entity';
import { Repository } from 'typeorm';
import { GetThreadsDto } from './dto/get.threads.dto';
import { Post } from 'src/post/post.entity';


@Injectable()
export class ThreadService {
    private currentId: number = 0;

    constructor(
        @InjectRepository(Thread)
        private threadRepository: Repository<Thread>,
        @InjectRepository(Post)
        private postRepository: Repository<Post>
    )
    {
        this.initCurrentId()
    }

    async createThread(threadDto: CreateThreadDto){
        const currentDate = new Date();
        const thread = await this.threadRepository.create({...threadDto, date: currentDate, lastActivityDate: currentDate, thread_id: this.getCurrentId()})
        await this.threadRepository.save(thread);
        return thread
    }

    async getTopThreads(params: GetThreadsDto){
        const threads = await this.threadRepository.createQueryBuilder()
        .orderBy("Thread.lastActivityDate", "DESC")
        .take(params.threadsNumber)
        .getMany();
        return threads
    }

    public getCurrentId() {
        this.currentId++;
        return this.currentId;
    }

    private async initCurrentId() {
        const maxThreadId = (await this.threadRepository.createQueryBuilder().select("MAX(Thread.thread_id)", "max").getRawOne()).max
        const maxPostId = (await this.postRepository.createQueryBuilder().select("MAX(Post.post_id)", "max").getRawOne()).max
        let maxId;
        if (maxThreadId && maxPostId) {
            maxId = Math.max(maxThreadId, maxPostId)
        }
        else if (!maxThreadId && maxPostId) {
            maxId = maxPostId
        }
        else if (maxThreadId && !maxPostId) {
            maxId = maxThreadId
        }
        else {
            maxId = 0
        }
        
        this.currentId = maxId
    }
}
