import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateThreadDto } from './dto/create.thread.dto';
import { ThreadService } from './thread.service';
import { GetThreadsDto } from './dto/get.threads.dto';

@Controller('thread')
export class ThreadController {
    constructor(private threadService: ThreadService){}

    @Post()
    createThread(@Body() threadDto: CreateThreadDto) {
        return this.threadService.createThread(threadDto)
    }

    @Get()
    getThreads(@Body() params: GetThreadsDto) {
        return this.threadService.getTopThreads(params)
    }
}
