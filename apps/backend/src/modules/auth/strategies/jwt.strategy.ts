import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigEnv } from '@config/env.config';
import RolesService from '@modules/roles/roles.service';
import { UsersService } from '@modules/users/users.service';
import { BusinessCode } from '@common/constants/business-code';
import { ResponseMessage } from '@common/constants/response-message';

interface JwtPayload {
  sub: string;
  r: string;
  v: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService<ConfigEnv, true>,
    private rolesService: RolesService,
    private usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService
        .get<string>('jwt.publicKey', { infer: true })
        .replace(/\\n/g, '\n'),
      algorithms: ['RS256'],
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.usersService.findUserByIdForValidate(payload.sub);

    if (!user) {
      throw new HttpException(
        {
          code: BusinessCode.UNAUTHORIZED,
          errors: ResponseMessage[BusinessCode.UNAUTHORIZED],
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (user.deleted) {
      throw new HttpException(
        {
          code: BusinessCode.ACCOUNT_DELETED,
          errors: ResponseMessage[BusinessCode.ACCOUNT_DELETED],
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (Number(user.isActive) === 0) {
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

    const roleWithPermissions = await this.rolesService.findRoleWithPermissionsById(
      payload.r.toString(),
    );

    return {
      _id: payload.sub,
      role: payload.r,
      permissions: roleWithPermissions?.permissions ?? [],
    };
  }
}
