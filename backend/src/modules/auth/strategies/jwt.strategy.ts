import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IUser } from '@interfaces/user.interface';
import { ConfigEnv } from '@config/env.config';
import RolesService from '@modules/roles/roles.service';
import { UsersService } from '@modules/users/users.service';
import { BusinessCode } from '@common/constants/business-code';
import { ResponseMessage } from '@common/constants/response-message';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService<ConfigEnv, true>,
    private rolesService: RolesService,
    private usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Lấy chuỗi token thô
      ignoreExpiration: false,
      // Với RS256 dùng publicKey
      secretOrKey: configService
        .get<string>('jwt.publicKey', { infer: true })
        .replace(/\\n/g, '\n'),
      algorithms: ['RS256'],
    });
  }

  //     const payload = {
  //       sub: _id,
  //       r: role._id,
  //       v: userRequest.tokenVersion || 0, // Thêm tokenVersion vào payload để kiểm soát token cũ
  //     };

  async validate(payload: any) {
    const user = await this.usersService.findUserById(payload.sub);

    if (!user) {
      throw new HttpException(
        {
          code: BusinessCode.UNAUTHORIZED,
          errors: ResponseMessage[BusinessCode.UNAUTHORIZED],
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    console.log('>>> JWT STRATEGY isDeleted USER = ', user.isDeleted);
    if (user.isDeleted) {
      throw new HttpException(
        {
          code: BusinessCode.ACCOUNT_DELETED,
          errors: ResponseMessage[BusinessCode.ACCOUNT_DELETED],
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    console.log('>>> JWT STRATEGY isActive USER = ', user.isActive);
    if (user.isActive === 0) {
      throw new HttpException(
        {
          code: BusinessCode.ACCOUNT_DISABLED,
          errors: ResponseMessage[BusinessCode.ACCOUNT_DISABLED],
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    if ((payload.v || 0) !== (user.tokenVersion || 0)) {
      throw new HttpException(
        {
          code: BusinessCode.RECALLL_TOKEN,
          errors: ResponseMessage[BusinessCode.RECALLL_TOKEN],
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const RoleWithPermissions = await this.rolesService.findRoleWithPermissionsById(
      payload.r.toString(),
    );

    return {
      _id: payload.sub,
      role: payload.r,
      permissions: RoleWithPermissions?.permissions ?? [],
    };
  }
}
