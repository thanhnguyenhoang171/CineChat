import { BusinessCode } from '@common/constants/business-code';
import { HttpStatusCode } from '@common/constants/http-status-code';
import { ResponseMessage } from '@common/constants/response-message';
import { RESPONSE_STATUS } from '@common/decorators/response_message.decorator';
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface ApiResponse<T> {
  status: number;
  code?: BusinessCode;
  message?: string;
  data?: T;
  errors?: any;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
  private readonly logger = new Logger(TransformInterceptor.name);

  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpCode =
      this.reflector.get<HttpStatusCode>(RESPONSE_STATUS, context.getHandler()) ||
      HttpStatusCode.OK;

    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    return next.handle().pipe(
      map((data) => {
        response.status(httpCode);

        const code: BusinessCode = data?.code ?? BusinessCode.SUCCESS;
        const message = data?.message ?? ResponseMessage[code] ?? 'Success';
        // Unwrap logic — chỉ giữ payload thật sự
        let payload: any = undefined;
        if (data && typeof data === 'object') {
          const { code, message, ...rest } = data; // data = { code: 'USR_001', data: { firstName: 'Thanh' } }→ rest = { data: { firstName: 'Thanh' } }
          if (Object.keys(rest).length > 0) {
            // Nếu rest chỉ chứa key "data", unwrap luôn
            if (
              Object.keys(rest).length === 1 &&
              Object.prototype.hasOwnProperty.call(rest, 'data')
            ) {
              payload = rest.data; // Nếu rest chỉ có 1 key và key đó là 'data' → unwrap: payload = rest.data.=> Tránh trả data: { data: {...} }.
            } else {
              payload = rest; // Nếu rest có nhiều key (ví dụ user & token) → giữ cả rest làm payload.
            }
          }
        }

        const res: ApiResponse<any> = {
          status: httpCode,
          code,
          message,
        };

        if (payload !== undefined) {
          res.data = payload;
        }

        this.logger.log(`[${request.method}] ${request.url} -> ${httpCode}`);
        return res;
      }),

      // catchError((err) => {
      //   let status = HttpStatusCode.INTERNAL_SERVER_ERROR;
      //   let code = BusinessCode.INTERNAL_ERROR;
      //   let errors = ResponseMessage[BusinessCode.INTERNAL_ERROR];

      //   if (err instanceof HttpException) {
      //     const res: any = err.getResponse();
      //     status = err.getStatus();
      //     code = res.code || code;
      //     errors =
      //       res.errors ||
      //       res.message ||
      //       ResponseMessage[code] ||
      //       'Unknown error';
      //   }

      //   this.logger.error(
      //     `[${request.method}] ${request.url} -> ${status}`,
      //     err.stack,
      //   );

      //   response.status(status).json({
      //     status,
      //     code,
      //     errors,
      //   });

      //   return new Observable<never>();
      // }),
    );
  }
}
