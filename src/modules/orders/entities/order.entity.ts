import { OrderStatus } from '@prisma/client'; 

export class Order {
  id: string;
  description: string;
  specifications: string;
  quantity: number;
  status: OrderStatus; 
  chatRoomId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  metadata?: string;
}
