import { ApiProperty } from "@nestjs/swagger"

export class CreateThreadDto{
    @ApiProperty({example: 'Всем привет, я тут новенький.', description: 'Текст треда'})
    readonly text: string

    @ApiProperty({example: true, description: 'Должен ли бот сразу ответить в тред'})
    readonly isRequireReply?: boolean
}