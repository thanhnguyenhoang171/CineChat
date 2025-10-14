import { BusinessCode } from '@common/constants/business-code';
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const exceptionResponse = exception.getResponse();
    let code = BusinessCode.INTERNAL_SERVER_ERROR;
    let errors: string | any = exception.message;

    if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
      const res = exceptionResponse as Record<string, any>;
      code = res.code || code;
      errors = res.errors || res.message || errors;
    }

    this.logger.error(`[${request.method}] ${request.url} -> ${status}`, JSON.stringify(errors));

    response.status(status).json({
      status,
      code,
      timestamp: new Date().toISOString(),
      path: request.url,
      errors,
    });
  }
}
