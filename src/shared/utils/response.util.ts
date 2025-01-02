export const successResponse = <T>(data: T, message = 'Success') => ({
    status: 'success',
    message,
    data,
  });
  
  export const errorResponse = (message = 'Error', details: Record<string, unknown> | null = null) => ({
    status: 'error',
    message,
    details,
  });
  