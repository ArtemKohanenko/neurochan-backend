import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreatePostDto } from './dto/create.post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
    constructor(private postService: PostService){}

    @Post(':threadId')
    createPost(@Param('threadId') threadId: number, @Body() postDto: CreatePostDto) {
        return this.postService.createPost(threadId, postDto)
    }

    @Get(':threadId')
    getPostsByThread(@Param('threadId') threadId: number) {
        return this.postService.getPostsByThread(threadId)
    }
}
