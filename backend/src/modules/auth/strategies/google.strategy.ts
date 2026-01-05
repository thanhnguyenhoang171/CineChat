import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { ConfigEnv } from '@config/env.config';
import { Strategy, Profile } from 'passport-google-oauth20';
import { CommonConstant } from '@common/constants/common-constant';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private configService: ConfigService<ConfigEnv, true>) {
    super({
      clientID: configService.get('ggAuth.googleClientId', { infer: true }),
      clientSecret: configService.get('ggAuth.googleSecret', { infer: true }),
      callbackURL: configService.get('ggAuth.googleCallbackUrl', { infer: true }),
      scope: ['email', 'profile'],
    });
  }
  async validate(accessToken: string, refreshToken: string, profile: Profile, done: any) {
    return {
      email: profile._json.email,
      firstName: profile._json.given_name,
      lastName: profile._json.family_name,
      picture: profile._json.picture,
      role: CommonConstant.roleLevel.USER,
      emailVerified: profile._json.email_verified,
      googleId: profile.id,
    };
  }
}