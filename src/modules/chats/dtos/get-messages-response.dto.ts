import { ApiProperty } from '@nestjs/swagger';
import { MessageResponseDto } from './message-response.dto';

export class GetMessagesResponseDto {
  @ApiProperty({
    description: 'List of messages in the chat',
    type: [MessageResponseDto],
  })
  messages: MessageResponseDto[];
}
