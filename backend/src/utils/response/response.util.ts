export interface ResponseFormat<T> {
    code: number;
    status: 'success' | 'error';
    data: T;
  }
  
  export const createResponse = <T>(code: number, status: 'success' | 'error', data: T): ResponseFormat<T> => {
    return {
      code,
      status,
      data,
    };
  };
  