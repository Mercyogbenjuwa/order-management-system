import { ConflictException, HttpException, InternalServerErrorException } from '@nestjs/common';


export async function safeExecute<T>(action: () => Promise<T>): Promise<T> {
  try {
    return await action();
  } catch (error) {
    handleError(error);
  }
}

function handleError(error: any): never {
  if (error instanceof HttpException) {
    throw error;
  }

  if (error.code === 'P2002') {
    throw new ConflictException('Unique constraint violation');
  }

  throw new InternalServerErrorException('An unexpected error occurred');
}

