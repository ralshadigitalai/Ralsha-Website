import { NextResponse } from 'next/server';
import { HTTP_STATUS } from '../config/constants';

type SuccessResponse<T> = {
  success: true;
  data: T;
  message?: string;
};

type ErrorResponse = {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
};

export const createSuccessResponse = <T>(
  data: T,
  message?: string,
  status: number = HTTP_STATUS.OK
) => {
  const response: SuccessResponse<T> = { success: true, data, message };
  return NextResponse.json(response, { status });
};

export const createErrorResponse = (
  code: string,
  message: string,
  status: number = HTTP_STATUS.INTERNAL_SERVER_ERROR,
  details?: any
) => {
  const response: ErrorResponse = {
    success: false,
    error: {
      code,
      message,
      details,
    },
  };
  return NextResponse.json(response, { status });
};
