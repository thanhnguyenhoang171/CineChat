import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ConfigEnv } from '@config/env.config';

export const createRefreshToken = (
  payload: any,
  jwtService: JwtService,
  configService: ConfigService<ConfigEnv, true>,
): string => {
  const privateKey = configService.get<string>('jwt.privateKey', { infer: true });
  const expiresIn = configService.get<string>('jwt.refreshExpiresIn', { infer: true });

  return jwtService.sign(payload, {
    privateKey: privateKey?.replace(/\\n/g, '\n'),
    algorithm: 'RS256',
    expiresIn: expiresIn,
  } as any); // Use type assertion if needed
};