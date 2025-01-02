export class AppError extends Error {
    constructor(public statusCode: number, public message: string) {
      super(message);
      this.name = 'AppError';
    }
  }
  

  export interface ApiResponse<T = any> {
    status: 'success' | 'error';
    message: string;
    data?: T;           
    details?: any;    
  }
  