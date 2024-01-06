import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateThreadDto } from './dto/create.thread.dto';
import { ThreadService } from './thread.service';

@Controller('thread')
export class ThreadController {
    constructor(private threadService: ThreadService){}

    @Post()
    createThread(@Body() threadDto: CreateThreadDto) {
        return this.threadService.createThread(threadDto)
    }

    @Get(':number')
    getThreads(@Param('number') number: number) {
        return this.threadService.getTopThreads(number)
    }
}
