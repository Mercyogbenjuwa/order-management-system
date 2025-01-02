import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsIn, IsEnum } from 'class-validator';
import { ORDER_STATUS } from 'src/shared/enums/orders.enum';

export class UpdateOrderStatusDto {
  @IsString()
  @IsEnum(ORDER_STATUS)
  @IsIn(['REVIEW', 'PROCESSING', 'COMPLETED'])
  @ApiProperty({ type: String, required: true, description: 'Status of the order' })
  status: ORDER_STATUS;
}