import { ApiProperty } from "@nestjs/swagger"

export class GetThreadsDto{
    @ApiProperty({example: 10, description: 'Количество тредов'})
    readonly threadsNumber: number
}