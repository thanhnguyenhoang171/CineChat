import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from '@modules/users/users.module';
import { ConfigEnv } from '@config/env.config';
import { JwtModuleOptions } from '@nestjs/jwt';
import { CommonModule } from '@common/common.module';
import RolesService from '@modules/roles/roles.service';
import { RolesModule } from '@modules/roles/roles.module';
import { GoogleStrategy } from '@modules/auth/strategies/google.strategy';

@Module({
  imports: [
    UsersModule,
    RolesModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (
        configService: ConfigService<ConfigEnv, true>,
      ): Promise<JwtModuleOptions> => {
        const privateKey = configService
          .get<string>('jwt.privateKey', { infer: true })
          ?.replace(/\\n/g, '\n');
        const publicKey = configService
          .get<string>('jwt.publicKey', { infer: true })
          ?.replace(/\\n/g, '\n');
        const expiresIn = configService.get<string>('jwt.expiresIn', { infer: true });

        return {
          privateKey,
          publicKey,
          signOptions: {
            algorithm: 'RS256',
            expiresIn: expiresIn as any, // Use type assertion
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, GoogleStrategy],
})
export class AuthModule {}