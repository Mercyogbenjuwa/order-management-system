import { SuccessResponse } from 'src/shared/utils/api-response.util';
import { UserResponseDto } from 'src/modules/users/dtos/user-response.dto';
import { CreateUserDto } from 'src/modules/users/dtos/create-user.dto';

export type IUserService = {
  create(dto: CreateUserDto): Promise<SuccessResponse<UserResponseDto>>;
  findById(id: string): Promise<SuccessResponse<UserResponseDto> | null>;
};
