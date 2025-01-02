import { ChatResponseDto } from 'src/modules/chats/dtos/chat-response.dto';
import { GetChatsResponseDto } from 'src/modules/chats/dtos/get-chats-response.dto';
import { GetMessagesResponseDto } from 'src/modules/chats/dtos/get-messages-response.dto';
import { MessageResponseDto } from 'src/modules/chats/dtos/message-response.dto';
import { SendMessageDto } from 'src/modules/chats/dtos/send-message.dto';
import { SuccessResponse } from 'src/shared/utils/api-response.util';



export interface IChatsService {
  getChatById(id: string): Promise<SuccessResponse<ChatResponseDto> | null>;
  sendMessage(chatId: string, dto: SendMessageDto): Promise<SuccessResponse<MessageResponseDto>>;
  closeChat(chatId: string, summary: string): Promise<SuccessResponse<ChatResponseDto>>;
  getMessagesForChat(chatId: string): Promise<SuccessResponse<GetMessagesResponseDto>>;
  getAllChats(): Promise<SuccessResponse<GetChatsResponseDto>>;
}
