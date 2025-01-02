import { ApiProperty } from '@nestjs/swagger';
import { ChatResponseDto } from './chat-response.dto';

export class GetChatsResponseDto {
  @ApiProperty({
    description: 'List of chats accessible to the user',
    type: [ChatResponseDto],
  })
  chats: ChatResponseDto[];
}
