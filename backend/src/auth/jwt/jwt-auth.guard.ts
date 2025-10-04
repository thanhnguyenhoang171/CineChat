
import { ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from 'src/decorators/jwt_public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
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
        if (err || !user) {
            throw err || new HttpException("Token không hợp lệ hoặc không có Token ở Bearer Token ở Header request!", HttpStatus.UNAUTHORIZED);
        }

        return user;
    }
}
