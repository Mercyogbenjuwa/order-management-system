import { Injectable } from '@nestjs/common';
import { PrismaClient, Chat, ChatRoom, Message } from '@prisma/client';

@Injectable()
export class ChatRepository {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  /**
   * Create a new chat room.
   */
  async createChatRoom(): Promise<ChatRoom> {
    return this.prisma.chatRoom.create({
      data: {},
    });
  }

  /**
   * Create a new chat referencing the newly created ChatRoom.
   * @param orderId - The ID of the associated order.
   * @param chatRoomId - The ID of the chat room.
   */
  async createChat(orderId: string, chatRoomId: string): Promise<Chat> {
    return this.prisma.chat.create({
      data: {
        orderId,
        chatRoomId,
      },
    });
  }

  /**
   * Retrieve a chat by its ID.
   * @param id - The ID of the chat.
   * @returns The chat if found, otherwise null.
   */
  async getChatById(id: string): Promise<Chat | null> {
    return this.prisma.chat.findUnique({
      where: { id },
      include: {
        chatRoom: true,
        messages: true,
      },
    });
  }

  /**
   * Retrieve a chat by its associated Order ID.
   * @param orderId - The Order ID.
   * @returns The chat if found, otherwise null.
   */
  async getChatByOrderId(orderId: string): Promise<Chat | null> {
    return this.prisma.chat.findUnique({
      where: { orderId },
      include: {
        chatRoom: true,
        messages: true,
      },
    });
  }

  /**
   * Send a message within a chat room.
   * @param chatRoomId - The ID of the chat room.
   * @param userId - The ID of the user sending the message.
   * @param content - The content of the message.
   * @param chatId - Optional: The ID of the chat.
   * @returns The created message.
   */
  async sendMessage(
    chatRoomId: string,
    userId: string,
    content: string,
    chatId?: string
  ): Promise<Message> {
    return this.prisma.message.create({
      data: {
        chatRoomId,
        userId,
        content,
        chatId,
      },
    });
  }

  /**
   * Retrieve all messages for a specific chat.
   * @param chatId - The ID of the chat.
   * @returns An array of messages.
   */
  async getMessagesByChatId(chatId: string): Promise<Message[]> {
    return this.prisma.message.findMany({
      where: { chatId },
      orderBy: { createdAt: 'asc' }, // Optional: order messages chronologically
    });
  }

  /**
   * Retrieve all chats accessible to a user.
   * @returns An array of chats.
   */
  async getAllChats(): Promise<Chat[]> {
    return this.prisma.chat.findMany({
      include: {
        chatRoom: true,
        messages: true,
      },
    });
  }


  /**
   * Close a chat by updating its summary and isClosed status.
   * @param chatId - The ID of the chat to close.
   * @param summary - A brief summary of the closure.
   * @returns The updated chat.
   */
  async closeChat(chatId: string, summary: string): Promise<Chat> {
    return this.prisma.chat.update({
      where: { id: chatId },
      data: {
        isClosed: true,
        summary,
      },
    });
  }
}
