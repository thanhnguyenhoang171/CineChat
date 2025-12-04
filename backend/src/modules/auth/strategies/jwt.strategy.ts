import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IUser } from '@interfaces/user.interface';
import { ConfigEnv } from '@config/env.config';
import RolesService from '@modules/roles/roles.service';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService<ConfigEnv, true>,
    private rolesService: RolesService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Lấy chuỗi token thô
      ignoreExpiration: false,
      // Với RS256 dùng publicKey
      secretOrKey: configService.get<string>('jwt.publicKey', {infer: true}).replace(/\\n/g, '\n'),
      algorithms: ['RS256'],
    });
  }

// payload lúc này chỉ có: { sub, _id, role }
  async validate(payload: IUser) {
    const roleId = payload?.role?._id;
    const RoleWithPermissions = await this.rolesService.findRoleWithPermissionsById(roleId);
    return {
      _id: payload._id,
      firstName: payload.firstName,
      lastName: payload.lastName,
      username: payload?.username,
      email: payload?.email,
      role: payload.role,
      permissions: RoleWithPermissions?.permissions ?? [],
    };
  }
}
