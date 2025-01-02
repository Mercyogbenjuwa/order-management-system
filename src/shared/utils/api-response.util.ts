export interface SuccessResponse<T> {
    status: 'success';
    message: string;
    data: T;
  }
  
  export interface ErrorResponse {
    status: 'error';
    message: string;
    details?: Record<string, unknown> | null;
  }
  
  export function successResponse<T>(data: T, message = 'Success'): SuccessResponse<T> {
    return {
      status: 'success',
      message,
      data,
    };
  }
  
  export function errorResponse(message = 'Error', details: Record<string, unknown> | null = null): ErrorResponse {
    return {
      status: 'error',
      message,
      details,
    };
  }
  