import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const context = host.switchToHttp();

    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let errors: string[] | undefined;

    if (exception instanceof HttpException) {
      status = exception.getStatus();

      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (
        typeof exceptionResponse === 'object' &&
        exceptionResponse !== null
      ) {
        const errorResponse = exceptionResponse as {
          message?: string | string[];
          error?: string;
        };

        if (Array.isArray(errorResponse.message)) {
          message = 'Validation failed';
          errors = errorResponse.message;
        } else if (typeof errorResponse.message === 'string') {
          message = errorResponse.message;
        } else if (typeof errorResponse.error === 'string') {
          message = errorResponse.error;
        }
      }
    }

    const responseBody: {
      success: false;
      message: string;
      errors?: string[];
    } = {
      success: false,
      message,
    };

    if (errors && errors.length > 0) {
      responseBody.errors = errors;
    }

    response.status(status).json(responseBody);
  }
}