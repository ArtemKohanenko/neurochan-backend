import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateThreadDto } from './dto/create.thread.dto';
import { ThreadService } from './thread.service';
import { CaptchaGuard } from './captcha.guard';

@Controller('thread')
export class ThreadController {
    constructor(private threadService: ThreadService){}

    @Post()
    @UseGuards(CaptchaGuard)
    createThread(@Body() threadDto: CreateThreadDto) {
        return this.threadService.createThread(threadDto)
    }

    @Get(':number')
    getThreads(@Param('number') number: number) {
        return this.threadService.getTopThreads(number)
    }
}
