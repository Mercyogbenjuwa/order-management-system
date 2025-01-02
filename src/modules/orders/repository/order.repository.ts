import { PrismaClient, OrderStatus } from '@prisma/client';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { Order } from '../entities/order.entity';

const prisma = new PrismaClient();

export class OrdersRepository {

  async createOrder(data: CreateOrderDto & { status: OrderStatus }): Promise<Order> {
    return prisma.order.create({
      data: {
        description: data.description,
        specifications: data.specifications,
        quantity: data.quantity,
        status: data.status, 
        metadata: data.metadata, 
        user: {
          connect: {
            id: data.userId,
          },
        },
      },
    }) as unknown as Order;
  }


  async findOrderById(id: string): Promise<Order | null> {
    return prisma.order.findUnique({
      where: { id },
    }) as unknown as Order;
  }

  async updateOrderStatus(id: string, status: OrderStatus): Promise<Order> {
    return prisma.order.update({
      where: { id },
      data: { status },
    }) as unknown as Order;
  }

  async updateOrder(id: string, data: Partial<Order>): Promise<Order> {
    return prisma.order.update({
      where: { id },
      data, 
    }) as unknown as Order;
  }
  
}

