import { IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CloseChatDto {
  @ApiProperty({
    description: 'A brief summary of the chat closure.',
    maxLength: 50,
    example: 'Chat resolved successfully.',
  })
  @IsString({ message: 'Summary must be a string.' })
  @MaxLength(50, { message: 'Summary must not exceed 50 characters.' })
  summary: string;
}
