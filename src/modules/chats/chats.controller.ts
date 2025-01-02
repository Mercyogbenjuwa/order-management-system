import { Controller, Post, Get, Body, Param, Patch, HttpCode, HttpStatus, Req } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { CreateChatDto } from './dtos/create-message.dto';
import { SendMessageDto } from './dtos/send-message.dto';
import { SuccessResponse } from 'src/shared/utils/api-response.util';
import { ChatResponseDto } from './dtos/chat-response.dto';
import { MessageResponseDto } from './dtos/message-response.dto';
import { ApiResponse } from '@nestjs/swagger';
import { CloseChatDto } from './dtos/close-chat.dto';
import { GetMessagesResponseDto } from './dtos/get-messages-response.dto';
import { GetChatsResponseDto } from './dtos/get-chats-response.dto';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}


  @Get(':id')
  @ApiResponse({ type: ChatResponseDto, description: 'Gets a chat room by ID' })
  async getChatById(@Param('id') id: string): Promise<SuccessResponse<ChatResponseDto> | null> {
    return this.chatsService.getChatById(id);
  }

  @Post(':id/message')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ type: MessageResponseDto, description: 'Sends a message to a chat room' })
  async sendMessage(
    @Param('id') chatId: string,
    @Body() dto: SendMessageDto
  ): Promise<SuccessResponse<MessageResponseDto>> {
    return this.chatsService.sendMessage(chatId, dto);
  }

  
  
  @Patch(':id/close')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ type: ChatResponseDto, description: 'Closes a chat room' })
  async closeChat(
    @Param('id') chatId: string,
    @Body() closeChatDto: CloseChatDto,
  ): Promise<SuccessResponse<ChatResponseDto>> {
    return this.chatsService.closeChat(chatId, closeChatDto.summary);
  }


  /**
   * Get all messages for a specific chat
   */
  @Get(':id/messages')
  @ApiResponse({
    type: GetMessagesResponseDto,
    description: 'Retrieves all messages for a specific chat',
  })
  async getMessagesForChat(
    @Param('id') chatId: string,
  ): Promise<SuccessResponse<GetMessagesResponseDto>> {
    return this.chatsService.getMessagesForChat(chatId);
  }

  /**
   * Get all chats accessible to the authenticated user
   */
  @Get()
  @ApiResponse({
    type: GetChatsResponseDto,
    description: 'Retrieves all chats accessible to the user',
  })
  async getAllChats(
  ): Promise<SuccessResponse<GetChatsResponseDto>> {
    return this.chatsService.getAllChats();
  }
}
