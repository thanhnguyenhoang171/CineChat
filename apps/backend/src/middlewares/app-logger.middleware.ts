
import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';
import { getClientIpUtil } from '@common/utils/get-client-ip.util';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { method, originalUrl: url } = request;
    const userAgent = request.get('user-agent') || '';
    let ip = getClientIpUtil(request);

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
