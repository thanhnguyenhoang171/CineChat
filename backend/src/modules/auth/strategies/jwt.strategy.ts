import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IUser } from '@interfaces/user.interface';
import { ConfigEnv } from '@config/env.config';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService<ConfigEnv, true>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Lấy chuỗi token thô
      ignoreExpiration: false,
      // Với RS256 dùng publicKey
      secretOrKey: configService.get<string>('jwt.publicKey', {infer: true}).replace(/\\n/g, '\n'),
      algorithms: ['RS256'],
    });
  }

  async validate(payload: IUser) {
    return {
      _id: payload._id,
      firstName: payload.firstName,
      lastName: payload.lastName,
      username: payload?.username,
      email: payload?.email,
      role: payload.role,
      permissions: payload?.permissions,
    };
  }
}
