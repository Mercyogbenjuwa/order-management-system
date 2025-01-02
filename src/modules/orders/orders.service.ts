import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dtos/create-order.dto';
import { UpdateOrderStatusDto } from './dtos/update-order.dto';
import { OrderResponseDto } from './dtos/order-response.dto';
import { OrdersRepository } from './repository/order.repository';
import { UsersRepository } from '../users/repository/user.repository';
import { ChatRepository } from '../chats/repository/chat.repository'; 
import { successResponse, SuccessResponse } from '../../shared/utils/api-response.util';
import { safeExecute } from '../../shared/utils/safe-execution.util';
import { OrderStatus } from '@prisma/client';
import { IOrdersService } from '../../shared/interfaces/orders.interface';
import { UserRole } from '../../shared/enums/orders.enum';

@Injectable()
export class OrdersService implements IOrdersService {
  private readonly ordersRepository = new OrdersRepository();
  private readonly chatRepository = new ChatRepository(); 
  private readonly usersRepository = new UsersRepository(); 

  /**
   * Creates a new order. 
   * - Sets status to REVIEW
   * - Auto-creates a chat room for the order.
   */
  async create(dto: CreateOrderDto): Promise<SuccessResponse<OrderResponseDto>> {
    return safeExecute(async () => {
      const user = await this.usersRepository.findUserById(dto.userId);
      if (!user) {
        throw new BadRequestException(`User with ID ${dto.userId} not found`);
      }
      if (user.role !== UserRole.REGULAR) {
        throw new ForbiddenException('Only regular users can create orders');
      }
      const admin = await this.usersRepository.findFirstAdmin();
      if (!admin) {
        throw new BadRequestException('No admin user available to assign');
      }
      const updatedMetadata = dto.metadata ? [...dto.metadata, admin.id] : [admin.id];
      const newOrder = await this.ordersRepository.createOrder({
        ...dto,
        status: OrderStatus.REVIEW, 
        metadata: updatedMetadata,
      });
      const newChatRoom = await this.chatRepository.createChatRoom(); 
      await this.ordersRepository.updateOrder(newOrder.id, {
        chatRoomId: newChatRoom.id,
      });
      await this.chatRepository.createChat(newOrder.id, newChatRoom.id);
      const mappedOrder = this.mapToResponseDto(newOrder);
      return successResponse(mappedOrder, 'Order created successfully');
    });
  }
  


  /**
   * Finds an order by ID
   */
  async findById(id: string): Promise<SuccessResponse<OrderResponseDto> | null> {
    return safeExecute(async () => {
      const order = await this.ordersRepository.findOrderById(id);
      if (!order) return null;
      const mappedOrder = this.mapToResponseDto(order);
      return successResponse(mappedOrder, 'Order retrieved successfully');
    });
  }

  /**
   * Updates the order status
   * - If the chat is closed, move from REVIEW → PROCESSING
   * - Admin can move to COMPLETED afterward
   */
  async updateStatus(id: string, dto: UpdateOrderStatusDto): Promise<SuccessResponse<OrderResponseDto>> {
    return safeExecute(async () => {
      const updatedEntity = await this.ordersRepository.updateOrderStatus(id, dto.status);
      const mappedOrder = this.mapToResponseDto(updatedEntity);
      return successResponse(mappedOrder, 'Order status updated successfully');
    });
  }

  /**
   * Convert the raw Prisma order to a typed OrderResponseDto
   */
  private mapToResponseDto(order: any): OrderResponseDto {
    return {
      id: order.id,
      description: order.description,
      specifications: order.specifications,
      quantity: order.quantity,
      metadata: order.metadata,
      status: order.status,
      userId: order.userId,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    };
  }
}
