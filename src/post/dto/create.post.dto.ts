import { ApiProperty } from "@nestjs/swagger"

export class CreatePostDto{
    @ApiProperty({example: 'Кинул, проверяй.', description: 'Текст поста'})
    readonly text: string
}