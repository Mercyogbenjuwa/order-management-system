import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ type: String, description: 'ID of the user' })
  id: string;

  @ApiProperty({ type: String, description: 'Email of the user' })
  email: string;

  @ApiProperty({ type: String, description: 'Name of the user' })
  name: string;

  @ApiProperty({ enum: ['ADMIN', 'REGULAR'], description: 'Role of the user' })
  role: 'ADMIN' | 'REGULAR';

  @ApiProperty({ type: Date, description: 'User creation date' })
  createdAt: Date;

  @ApiProperty({ type: Date, description: 'User last update date' })
  updatedAt: Date;
}
