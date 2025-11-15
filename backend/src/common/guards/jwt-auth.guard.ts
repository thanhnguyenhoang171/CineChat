import { IS_PUBLIC_KEY } from '@common/decorators/jwt_public.decorator';
import { ExecutionContext, HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { BusinessCode } from '@common/constants/business-code';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger =  new Logger(JwtAuthGuard.name);

  constructor(private reflector: Reflector) {
    super();
  }
  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }

  handleRequest(err, user, info, context: ExecutionContext) {
    // You can throw an exception based on either "info" or "err" arguments
    this.logger.log(">>> JWT AUTH GUARD INFO = " + info.toString());
    this.logger.error(">>> JWT AUTH GUARD ERRORS = " + err.toString());
    if (err || !user) {
      throw (
        err ||
        new HttpException(
          {
            code: BusinessCode.UNAUTHORIZED,
            errors: 'Token không hợp lệ hoặc không có Token ở Bearer Token ở Header request!',
          },
          HttpStatus.UNAUTHORIZED,
        )
      );
    }
    return user;
  }
}
