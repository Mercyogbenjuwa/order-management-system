import { Module } from '@nestjs/common';
import { ChatsController } from './chats.controller';
import { ChatsService } from './chats.service';
import { OrdersService } from '../orders/orders.service';

@Module({
  controllers: [ChatsController],
  providers: [ChatsService, OrdersService],
  exports: [ChatsService],
})
export class ChatsModule {}