import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { IUserService } from '../../shared/interfaces/users.interface';
import { UserResponseDto } from './dtos/user-response.dto';
import { safeExecute } from '../../shared/utils/safe-execution.util'; 
import { UsersRepository } from './repository/user.repository';
import { successResponse, SuccessResponse } from '../../shared/utils/api-response.util';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class UsersService implements IUserService {
  private readonly userRepository = new UsersRepository(); 

  async create(dto: CreateUserDto): Promise<SuccessResponse<UserResponseDto>> {
    return safeExecute(async () => {
      const existingUser = await this.userRepository.findUserByEmail(dto.email);
      if (existingUser) throw new ConflictException('User with this email already exists');
        dto.password = await bcrypt.hash(dto.password, 10);
        const newUser = await this.userRepository.createUser(dto);  
      const mappedUser = this.mapToResponse(newUser);
      return successResponse(mappedUser, 'User created successfully');
    });
  }
  
  async findById(id: string): Promise<SuccessResponse<UserResponseDto>> {
    return safeExecute(async () => {
      const user = await this.userRepository.findUserById(id);
      if (!user) throw new NotFoundException('User not found');
      const mappedUser = this.mapToResponse(user);
      return successResponse(mappedUser, 'User retrieved successfully');
    });
  }


  private mapToResponse(user: UserResponseDto): UserResponseDto {
    return {
      ...user,
      role: user.role as 'ADMIN' | 'REGULAR',
    };
  }
  
}
