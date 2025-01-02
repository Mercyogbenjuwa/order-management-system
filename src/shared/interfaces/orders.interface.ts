import { CreateOrderDto } from "src/modules/orders/dtos/create-order.dto";
import { SuccessResponse } from "../utils/api-response.util";
import { UpdateOrderStatusDto } from "src/modules/orders/dtos/update-order.dto";
import { OrderResponseDto } from "../../modules/orders/dtos/order-response.dto";



export interface IOrdersService {
  create(dto: CreateOrderDto): Promise<SuccessResponse<OrderResponseDto>>;
  findById(id: string): Promise<SuccessResponse<OrderResponseDto> | null>;
  updateStatus(id: string, dto: UpdateOrderStatusDto): Promise<SuccessResponse<OrderResponseDto>>;
}
