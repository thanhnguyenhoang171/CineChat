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

  //     const payload = {
  //       sub: _id,
  //       r: role._id,
  //     };

  async validate(payload: any) {
    const RoleWithPermissions = await this.rolesService.findRoleWithPermissionsById(payload.r.toString());
    return {
      _id: payload.sub,
      role: payload.r,
      permissions: RoleWithPermissions?.permissions ?? [],
    };
  }
}
