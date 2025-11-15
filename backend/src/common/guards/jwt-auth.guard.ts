import { IS_PUBLIC_KEY, IS_PUBLIC_PERMISSION } from '@common/decorators/auth.decorator';
import { ExecutionContext, HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { BusinessCode } from '@common/constants/business-code';
import { Request, Response } from 'express';
import { ResponseMessage } from '@common/constants/response-message';

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

  handleRequest(err, user, info, context: ExecutionContext) {
    // You can throw an exception based on either "info" or "err" arguments
    this.logger.log('>>> JWT AUTH GUARD INFO = ' + info);
    this.logger.error('>>> JWT AUTH GUARD ERRORS = ' + err);
    this.logger.error('>>> JWT AUTH USER INFO = ' + user);
    if (err || !user) {
      throw (
        err ||
        new HttpException(
          {
            code: BusinessCode.UNAUTHORIZED,
            errors: ResponseMessage[BusinessCode.UNAUTHORIZED],
          },
          HttpStatus.UNAUTHORIZED,
        )
      );
    }

    // authorization guard
    const request: Request = context.switchToHttp().getRequest();
    this.logger.log('>>> CHECKING REQUEST = ', request);

    // get route and method to check permissions to access this api
    const publicPermission = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_PERMISSION, [
      context.getHandler(),
      context.getClass(),
    ]);
    const targetMethod = request?.method;
    const targetEndpoint = request?.route?.path;

    this.logger.log(
      '>>> CHECKING TARGET METHOD AND ENDPOINT = ' + '[' + targetMethod + '] - ' + targetEndpoint,
    );

    const permissionList = user?.permissions ?? [];

    let isAllowAccess: boolean = permissionList.find(
      (permission: any) =>
        targetMethod === permission.method && targetEndpoint === permission.apiPath,
    );

    if (targetEndpoint.endsWith('/api/auth')) {
      isAllowAccess = true;
    }

    if (!isAllowAccess && !publicPermission) {
      throw new HttpException(
        {
          code: BusinessCode.FORBIDDEN,
          errors: ResponseMessage[BusinessCode.FORBIDDEN],
        },
        HttpStatus.FORBIDDEN,
      );
    }
    return user;
  }
}
