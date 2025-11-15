import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ConfigEnv } from '@config/env.config';

export const createRefreshToken = (
  payload: any, // Sử dụng interface thay vì any
  jwtService: JwtService,
  configService: ConfigService<ConfigEnv, true>,
): string => {
  const privateKey = configService.get<string>('jwt.privateKey', { infer: true });
  const expiresIn = configService.get<string>('jwt.refreshExpiresIn', { infer: true });

  return jwtService.sign(payload, {
    secret: privateKey.replace(/\\n/g, '\n'),
    algorithm: 'RS256',
    expiresIn: expiresIn,
  });
};