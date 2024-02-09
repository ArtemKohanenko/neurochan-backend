import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateThreadDto } from './dto/create.thread.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Thread } from './thread.entity';
import { Repository } from 'typeorm';
import { Post } from 'src/post/post.entity';

import { Logger } from '@nestjs/common';
import GetRandomElement from 'src/utils/GetRandomElement';
import { BotService } from 'src/bot/bot.service';
import { IdService } from 'src/id/id.service';


@Injectable()
export class ThreadService {

    constructor(
        private readonly idService: IdService,
        private readonly botService: BotService,
        @InjectRepository(Thread)
        private threadRepository: Repository<Thread>
    )
    {}

    async createThread(threadDto: CreateThreadDto){



        const currentDate = new Date();
        const thread = await this.threadRepository.create({...threadDto, date: currentDate, lastActivityDate: currentDate, threadId: this.idService.getCurrentId()})
        await this.threadRepository.save(thread);

        if (threadDto.isRequireReply) {
            this.botService.replyOnPost(thread.threadId);
        }

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
}
