import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt/jwt.strategy';
import ms from 'ms';
@Module({
  imports: [UsersModule, PassportModule, JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      privateKey: configService.get<string>('JWT_PRIVATE_KEY')?.replace(/\\n/g, '\n'),
      publicKey: configService.get<string>('JWT_PUBLIC_KEY')?.replace(/\\n/g, '\n'),
      signOptions: {
        algorithm: 'RS256',
        expiresIn: Math.floor(ms(configService.get<string>('JWT_EXPIRES_IN')) / 1000) || 3600,
      }
    }),
     inject: [ConfigService],
  })
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
