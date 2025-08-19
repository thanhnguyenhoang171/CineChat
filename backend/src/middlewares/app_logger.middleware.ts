import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { method, originalUrl: url } = request;
    const userAgent = request.get('user-agent') || '';
    let ip =
      (request.headers['x-forwarded-for'] as string) ||
      request.socket.remoteAddress;

    // Nếu là IPv6 prefix (::ffff:127.0.0.1) thì clean
    if (ip?.startsWith('::ffff:')) {
      ip = ip.replace('::ffff:', '');
      }
      
    response.on('close', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');

      this.logger.log(
        `[${method}]-${url} => status-${statusCode} | ContentLength-${contentLength} | Agent ${userAgent} | ip ${ip}`,
      );
    });

    next();
  }
}
