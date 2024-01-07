import { Injectable, Logger } from '@nestjs/common';
import { ThreadService } from 'src/thread/thread.service';
import { Interval } from '@nestjs/schedule';
import axios from '../axios'
import { PostService } from 'src/post/post.service';
import GetRandomElement from 'src/utils/GetRandomElement';


@Injectable()
export class BotService {
    constructor(
        private readonly threadService: ThreadService,
        private readonly postService: PostService,
    ) {}

    private async createThread(text: string) {
        this.threadService.createThread({text})
    }

    private async createPost(threadId: number, text: string) {
        this.postService.createPost(threadId, {text})
    }

    @Interval(5000)
    async handleRandomTask() {
        // const randomTime = Math.floor(Math.random() * 10000); // Генерируем случайное время в миллисекундах
        // await new Promise(resolve => setTimeout(resolve, randomTime));

        const randomThread = await this.threadService.getRandomThread();
        Logger.log(`Случаный тред: ${randomThread.threadId}`)
        const randomPost = GetRandomElement([...randomThread.posts, randomThread])
        Logger.log(`Случаный пост: ${randomPost.postId ? randomPost.postId : randomPost.threadId}`)

        const response = await axios.post<{data: { predict: string}}>('/predict', { text: randomPost.text });
        const predict = response.data.data.predict
        Logger.log(`Предсказание: ${predict}`)

        const postText = `>>${randomPost.postId ? randomPost.postId : randomPost.threadId} ` + predict
        this.createPost(randomThread.threadId, postText)
    }
}
