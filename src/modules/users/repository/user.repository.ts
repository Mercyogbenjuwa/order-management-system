import { PrismaClient, UserRole } from '@prisma/client';
import { CreateUserDto } from '../dtos/create-user.dto';


const prisma = new PrismaClient();

export class UsersRepository {
  async createUser(data: CreateUserDto) {
    return prisma.user.create({ data });
  }

  async findUserByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }

  async findUserById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  }

  async findFirstAdmin() {
    return prisma.user.findFirst({ where: { role: UserRole.ADMIN } });
  }

  
  
}
