import { Controller, Post, Body, Get, Param, Patch, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dtos/create-order.dto';
import { UpdateOrderStatusDto } from './dtos/update-order.dto';
import { OrderResponseDto } from './dtos/order-response.dto';
import { SuccessResponse } from 'src/shared/utils/api-response.util';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ type: OrderResponseDto, description: 'Creates a new order' })
  async createOrder(
    @Body() dto: CreateOrderDto
  ): Promise<SuccessResponse<OrderResponseDto>> {
    return this.ordersService.create(dto);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ type: OrderResponseDto, description: 'Gets an order by ID' })
  async getOrderById(
    @Param('id') id: string
  ): Promise<SuccessResponse<OrderResponseDto> | null> {
    return this.ordersService.findById(id);
  }

  @Patch(':id/status')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ type: OrderResponseDto, description: 'Updates the order status' })
  async updateOrderStatus(
    @Param('id') id: string,
    @Body() dto: UpdateOrderStatusDto
  ): Promise<SuccessResponse<OrderResponseDto>> {
    return this.ordersService.updateStatus(id, dto);
  }
}
