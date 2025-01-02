import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { ChatRepository } from './repository/chat.repository';
import { successResponse, SuccessResponse } from '../../shared/utils/api-response.util';
import { safeExecute } from '../../shared/utils/safe-execution.util';
import { ChatResponseDto } from './dtos/chat-response.dto';
import { MessageResponseDto } from './dtos/message-response.dto';
import { SendMessageDto } from './dtos/send-message.dto';
import { OrdersService } from '../orders/orders.service'; 
import { IChatsService } from '../../shared/interfaces/chats.interface';
import { ORDER_STATUS } from '../../shared/enums/orders.enum';
import { GetMessagesResponseDto } from './dtos/get-messages-response.dto';
import { GetChatsResponseDto } from './dtos/get-chats-response.dto';

@Injectable()
export class ChatsService implements IChatsService {
  private readonly chatRepository = new ChatRepository();
  constructor(
    private readonly ordersService: OrdersService
  ) {}


  /**
   * Get a chat by ID
   */
  async getChatById(id: string): Promise<SuccessResponse<ChatResponseDto> | null> {
    return safeExecute(async () => {
      const chat = await this.chatRepository.getChatById(id);
      if (!chat) return null;

      const mappedChat = this.mapPrismaChatToDto(chat);
      console.log(mappedChat)
      return successResponse(mappedChat, 'Chat retrieved successfully');
    });
  }

  /**
   * Send a message to a chat
   */
  async sendMessage(chatId: string, dto: SendMessageDto): Promise<SuccessResponse<MessageResponseDto>> {
    return safeExecute(async () => {
      const chat = await this.chatRepository.getChatById(chatId);
      if (!chat) {
        throw new NotFoundException('Chat not found.');
      }
      if (chat.isClosed) {
        throw new BadRequestException('Cannot send messages to a closed chat room.');
      }
      
      // Pass the correct chatRoomId instead of chatId
      const newMessage = await this.chatRepository.sendMessage(chat.chatRoomId, dto.senderId, dto.content, chatId);
      
      const mappedMessage = this.mapPrismaMessageToDto(newMessage);
      return successResponse(mappedMessage, 'Message sent successfully');
    });
}


  /**
   * Get all messages for a specific chat
   */
  async getMessagesForChat(
    chatId: string
  ): Promise<SuccessResponse<GetMessagesResponseDto>> {
    return safeExecute(async () => {
      const chat = await this.chatRepository.getChatById(chatId);
      if (!chat) {
        throw new NotFoundException('Chat not found.');
      }
      
      const messages = await this.chatRepository.getMessagesByChatId(chatId);
      const mappedMessages = messages.map((msg) =>
        this.mapPrismaMessageToDto(msg)
      );

      const response: GetMessagesResponseDto = {
        messages: mappedMessages,
      };

      return successResponse(response, 'Messages retrieved successfully');
    });
  }

  /**
   * Get all chats accessible to a user
   */
  async getAllChats(
  ): Promise<SuccessResponse<GetChatsResponseDto>> {
    return safeExecute(async () => {
      const chats = await this.chatRepository.getAllChats();
      const mappedChats = chats.map((chat) => this.mapPrismaChatToDto(chat));
      const response: GetChatsResponseDto = {
        chats: mappedChats,
      };
      return successResponse(response, 'Chats retrieved successfully');
    });
  }

  /**
   * Close the chat, set a summary, and (optionally) update the order status to PROCESSING
   */
  async closeChat(chatId: string, summary: string): Promise<SuccessResponse<ChatResponseDto>> {
    return safeExecute(async () => {
      if (summary.length > 50) {
        throw new BadRequestException('Summary must not exceed 50 characters.');
      }
      const chat = await this.chatRepository.getChatById(chatId);
      if (!chat) {
        throw new NotFoundException('Chat not found.');
      }
      if (chat.isClosed) {
        throw new BadRequestException('Chat room is already closed.');
      }
      const updatedChat = await this.chatRepository.closeChat(chatId, summary);
      await this.ordersService.updateStatus(chat.orderId, { status: ORDER_STATUS.PROCESSING });
      const mappedChat = this.mapPrismaChatToDto(updatedChat);
      return successResponse(mappedChat, 'Chat closed successfully');
    });
  }

  /**
   * Utility Mappers
   */
  private mapPrismaChatToDto(chat: any): ChatResponseDto {
    const { id, orderId, isClosed, summary, createdAt, updatedAt } = chat;
    return { id, orderId, isClosed, summary, createdAt, updatedAt };
  }

  private mapPrismaMessageToDto(message: any): MessageResponseDto {
    const { id, chatId, senderId, content, createdAt } = message;
    return { id, chatId, senderId, content, createdAt };
  }
  
}
