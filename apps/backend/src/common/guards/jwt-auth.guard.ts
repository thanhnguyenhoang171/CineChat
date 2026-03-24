import { IS_PUBLIC_KEY, IS_PUBLIC_PERMISSION } from '@common/decorators/auth.decorator';
import { ExecutionContext, HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { BusinessCode } from '@common/constants/business-code';
import { Request } from 'express';
import { ResponseMessage } from '@common/constants/response-message';
import { matchPermission } from '@common/helpers/auth.helper';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);

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

  handleRequest(err: any, user: any, info: any, context: ExecutionContext, status?: any) {
    if (err) {
      throw err;
    }
    this.logger.log('>>> JWT AUTH GUARD INFO = ' + info?.message);
    this.logger.log('>>> JWT AUTH USER INFO = ' + user?._id);

    if (!user) {
      this.logger.error('>>> JWT AUTH GUARD ERRORS = ' + err?.message);

      //  Xử lý các loại lỗi JWT cụ thể
      if (info?.name === 'TokenExpiredError') {
        throw new HttpException(
          {
            code: BusinessCode.TOKEN_EXPIRED,
            errors: ResponseMessage[BusinessCode.TOKEN_EXPIRED],
          },
          HttpStatus.UNAUTHORIZED,
        );
      }

      if (info?.name === 'JsonWebTokenError') {
        throw new HttpException(
          {
            code: BusinessCode.INVALID_TOKEN,
            errors: ResponseMessage[BusinessCode.INVALID_TOKEN],
          },
          HttpStatus.UNAUTHORIZED,
        );
      }

      throw new HttpException(
        {
          code: BusinessCode.UNAUTHORIZED,
          errors: ResponseMessage[BusinessCode.UNAUTHORIZED],
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    //  Authorization guard - Check permissions
    const request: Request = context.switchToHttp().getRequest();
    const targetMethod = request.method;
    const targetEndpoint = request.route?.path || request.path;

    this.logger.log(
      `>>> CHECKING PERMISSIONS FOR: [${targetMethod}] ${targetEndpoint} - User: ${user._id}`,
    );

    const publicPermission = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_PERMISSION, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Cho phép truy cập các endpoint auth mà không cần check permission
    if (targetEndpoint.startsWith('/api/auth')) {
      this.logger.log('>>> AUTH ENDPOINT - SKIPPING PERMISSION CHECK');
      return user;
    }

    //  Cho phép truy cập nếu là public permission
    if (publicPermission) {
      this.logger.log('>>> PUBLIC PERMISSION - ALLOWING ACCESS');
      return user;
    }

    //  Check permissions từ user
    const permissionList = user?.permissions ?? [];
    const isAllowAccess = permissionList.some((permission: any) =>
      matchPermission(permission, targetMethod, targetEndpoint),
    );

    if (!isAllowAccess) {
      this.logger.warn(
        `>>> ACCESS DENIED - User ${user._id} lacks permission for [${targetMethod}] ${targetEndpoint}`,
      );
      throw new HttpException(
        {
          code: BusinessCode.FORBIDDEN,
          errors: ResponseMessage[BusinessCode.FORBIDDEN],
        },
        HttpStatus.FORBIDDEN,
      );
    }

    this.logger.log('>>> ACCESS GRANTED');
    return user;
  }
}
