import { Controller, Post, Body, Get, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserResponseDto } from './dtos/user-response.dto';
import { SuccessResponse } from '../../shared/utils/api-response.util'; 


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ type: UserResponseDto, description: 'Creates a new user' })
  async createUser(
    @Body() createUserDto: CreateUserDto
  ): Promise<SuccessResponse<UserResponseDto>> {
    return this.usersService.create(createUserDto);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ type: UserResponseDto, description: 'Fetch a user by ID' })
  async getUserById(
    @Param('id') id: string
  ): Promise<SuccessResponse<UserResponseDto>> {
    return this.usersService.findById(id);
  }
}

