import { Inject, Injectable, Logger, forwardRef } from '@nestjs/common';
import { ThreadService } from 'src/thread/thread.service';
import { Interval } from '@nestjs/schedule';
import axios from '../axios'
import { PostService } from 'src/post/post.service';
import GetRandomElement from 'src/utils/GetRandomElement';
import { InjectRepository } from '@nestjs/typeorm';
import { Thread } from 'src/thread/thread.entity';
import { Post } from 'src/post/post.entity';
import { Repository } from 'typeorm';
import { IdService } from 'src/id/id.service';


@Injectable()
export class BotService {
    constructor(
        private readonly idService: IdService,
        @InjectRepository(Thread)
        private threadRepository: Repository<Thread>,
        @InjectRepository(Post)
        private postRepository: Repository<Post>
    ) {}

    @Interval(5000)
    async handleRandomTask() {
        const randomTime = Math.floor(Math.random() * 5000);
        await new Promise(resolve => setTimeout(resolve, randomTime));

        const threads = await this.threadRepository.createQueryBuilder()
        .leftJoinAndSelect("Thread.posts", "Post")
        .orderBy("Thread.lastActivityDate", "DESC")
        .getMany();
        const randomThread = GetRandomElement(threads);
        const randomPost = GetRandomElement([...randomThread.posts, randomThread].reverse())

        const replyId = randomPost.text.match(/^\>\>(\d+)/)
        let replied;
        if (replyId) {
            const repliedPostId = Number([1])
            replied = await this.postRepository.findOne({where: {postId: repliedPostId}})
            
            if (!replied) {
                replied = await this.threadRepository.findOne({where: {threadId: repliedPostId}})
            }
        }

        const context = replied? replied.text : ''
        const response = await axios.post<{data: { predict: string}}>('/predict', { text: randomPost.text, context: context });
        const predict = response.data.data.predict

        const postText = `>>${randomPost.postId ? randomPost.postId : randomPost.threadId} ` + predict
        this.createPost(randomThread.threadId, postText)
    }

    public async replyOnThread(threadId: number) {
        const thread = await this.threadRepository.findOne({
            where: {threadId}
        })

        const repliedPostId = Number(thread.text.match(/^\>\>(\d+)/)[1])
        let replied: Post | Thread = await this.postRepository.findOne({where: {postId: repliedPostId}})
        
        if (!replied) {
            replied = await this.threadRepository.findOne({where: {threadId: repliedPostId}})
        }


        const response = await axios.post<{data: { predict: string}}>('/predict', { text: thread.text, context: replied.text });
        const predict = response.data.data.predict

        const postText = `>>${threadId} ` + predict
        this.createPost(threadId, postText)
    }

    public async replyOnPost(postId: number) {
        const post = await this.postRepository.findOne({
            where: {postId},
            relations: {thread: true}
        })

        let context = ''
        const replyId = post.text.match(/^\>\>(\d+)/)
        if (replyId) {
            const repliedPostId = Number(replyId[1])
            let replied: Post | Thread = await this.postRepository.findOne({where: {postId: repliedPostId}})
            
            if (!replied) {
                replied = await this.threadRepository.findOne({where: {threadId: repliedPostId}})
            }
            context = replied.text
        }

        const response = await axios.post<{data: { predict: string}}>('/predict', { text: post.text, context: context });
        const predict = response.data.data.predict

        const postText = `>>${postId} ` + predict
        this.createPost(post.thread.threadId, postText)
    }

    private async createThread(text: string) {
        const currentDate = new Date();
        const thread = await this.threadRepository.create({...{text}, date: currentDate, lastActivityDate: currentDate, threadId: this.idService.getCurrentId()})
        await this.threadRepository.save(thread);
    }

    private async createPost(threadId: number, text: string) {
        const currentDate = new Date();
        const thread = await this.threadRepository.findOne({
            where: {
                threadId
            }
        })

        const postId = this.idService.getCurrentId();

        const post = await this.postRepository.create({...{text}, date: currentDate, postId: postId, thread: thread})
        await this.postRepository.save(post);
        await this.threadRepository.save({threadId: thread.threadId, lastActivityDate: currentDate})
    }
}
