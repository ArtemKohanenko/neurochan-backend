import { Inject, Injectable, Logger, forwardRef } from '@nestjs/common';
import { CreatePostDto } from './dto/create.post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { ThreadService } from 'src/thread/thread.service';
import { Thread } from 'src/thread/thread.entity';
import { BotService } from 'src/bot/bot.service';
import { IdService } from 'src/id/id.service';


@Injectable()
export class PostService {
    constructor(
        private readonly idService: IdService,
        private readonly botService: BotService,
        @InjectRepository(Post)
        private postRepository: Repository<Post>,
        @InjectRepository(Thread)
        private threadRepository: Repository<Thread>
    )
    {}

    async createPost(threadId: number, postDto: CreatePostDto){
        const currentDate = new Date();
        const thread = await this.threadRepository.findOne({
            where: {
                threadId
            }
        })

        const postId = this.idService.getCurrentId();

        const post = await this.postRepository.create({...postDto, date: currentDate, postId: postId, thread: thread})
        await this.postRepository.save(post);
        await this.threadRepository.save({threadId: thread.threadId, lastActivityDate: currentDate})

        if (postDto.isRequireReply) {
            this.botService.replyOnPost(postId);
        }

        return { data: post }
    }

    async getPostsByThread(threadId: number){
        const thread = await this.threadRepository.findOne({
            where: {
                threadId
            }
        })
        const posts = await this.postRepository.find({
            where: {
                thread
            }
        })
        
        return { data: posts }
    }
}
