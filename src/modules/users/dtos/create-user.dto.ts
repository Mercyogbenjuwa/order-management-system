import { IsEmail, IsNotEmpty, IsString, MinLength, Matches, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';


export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ type: String, required: true, description: 'Email of the user' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
  })
  @ApiProperty({ type: String, required: true, description: 'Password of the user' })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, required: true, description: 'Name of the user' })
  name: string;

  @IsEnum(UserRole, {
    message: 'role must be either ADMIN or REGULAR',
  })
  @ApiProperty({
    enum: UserRole, 
    required: true,
    description: 'Role of the user (ADMIN | REGULAR)',
  })
  role: UserRole;
}
