import { Injectable } from '@nestjs/common';
import { CreateThreadDto } from './dto/create.thread.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Thread } from './thread.entity';
import { Repository } from 'typeorm';
import { Post } from 'src/post/post.entity';

import { Logger } from '@nestjs/common';
import GetRandomElement from 'src/utils/GetRandomElement';


@Injectable()
export class ThreadService {
    private static currentId: number = 0;

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
        const thread = await this.threadRepository.create({...threadDto, date: currentDate, lastActivityDate: currentDate, threadId: this.getCurrentId()})
        await this.threadRepository.save(thread);
        return { data: thread }
    }

    async getTopThreads(number: number){
        const threads = await this.threadRepository.createQueryBuilder()
        .leftJoinAndSelect("Thread.posts", "Post")
        .orderBy("Thread.lastActivityDate", "DESC")
        .take(number)
        .getMany();

        const threadsWithLastPosts =  threads.map((el) => {
            return {...el, lastPosts: el.posts.sort((a, b) => a.date.getTime() - b.date.getTime()).slice(0, 3)}
        })

        const threadsRes = threadsWithLastPosts.map((el) => {
            return {...el, posts: el.posts.map((post) => post.postId)}
        })
        
        return { data: threadsRes }
    }

    private async initCurrentId() {
        const maxThreadId = (await this.threadRepository.createQueryBuilder().select("MAX(Thread.threadId)", "max").getRawOne()).max
        const maxPostId = (await this.postRepository.createQueryBuilder().select("MAX(Post.postId)", "max").getRawOne()).max
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
        
        ThreadService.currentId = maxId        
    }

    public getCurrentId() {
        ThreadService.currentId++;
        return ThreadService.currentId;
    }

    public async getRandomThread(): Promise<Thread> {
        const threads = await this.threadRepository.createQueryBuilder()
        .leftJoinAndSelect("Thread.posts", "Post")
        .getMany();
        const randomThread = GetRandomElement(threads);

        return randomThread;
    }
}
