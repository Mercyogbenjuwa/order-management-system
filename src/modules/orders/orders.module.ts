import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { ChatsService } from '../chats/chats.service';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, ChatsService],
  exports: [OrdersService],
})
export class OrdersModule {}