import { ApiProperty } from "@nestjs/swagger"

export class CreatePostDto{
    @ApiProperty({example: 'Кинул, проверяй.', description: 'Текст поста'})
    readonly text: string

    @ApiProperty({example: true, description: 'Должен ли бот сразу ответить на пост'})
    readonly isRequireReply?: boolean
}