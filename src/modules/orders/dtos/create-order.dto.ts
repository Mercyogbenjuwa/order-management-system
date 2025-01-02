import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt, Min } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, required: true, description: 'Description of the order' })
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, required: true, description: 'Specifications of the order' })
  specifications: string;

  @IsInt()
  @Min(1)
  @ApiProperty({ type: Number, required: true, description: 'Quantity of the order' })
  quantity: number;


  @IsNotEmpty()
  @ApiProperty()
  metadata: string[];


  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, required: true, description: 'Id of the user who created the order' })
  userId: string;
}
