import { passwordCompare } from '@common/utils/password-bcrypt.util';
import { IUser } from '@interfaces/user.interface';
import { RegisterAccountDto } from '@modules/users/dto/create-user.dto';
import { UsersService } from '@modules/users/users.service';
import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { BusinessCode } from '@common/constants/business-code';
import { createRefreshToken } from '@common/utils/access-token.util';
import { ConfigService } from '@nestjs/config';
import { ConfigEnv } from '@config/env.config';
import ms from 'ms';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private configService: ConfigService<ConfigEnv, true>,
    private jwtService: JwtService,
  ) {}
  private readonly logger = new Logger('AuthService');

  async register(registerAccountDto: RegisterAccountDto) {
    // return this.userService.registerAccount(registerAccountDto);
    const registeredUser = await this.userService.registerAccount(registerAccountDto);
    return {
      code: BusinessCode.REGISTERED,
      data: {
        _id: registeredUser?._id,
        createdAt: registeredUser?.createdAt,}
    };
  }

  // validate user
  async validateUser(username: string, pass: string): Promise<any> {
    // get user info by username:
    const userData = await this.userService.findUserByUsername(username);
    // decode password and compare
    if (userData && (await passwordCompare(pass, userData.password))) {
      // remove password before return
      const { password, __v, refreshToken, ...result } = userData;
      return result;
    }
    return null;
  }

  // handle login account
  async login(userRequest: IUser, response: Response) {
    const {_id, firstName, lastName, role} = userRequest;
    const payload = {
      sub: 'Token of ' + userRequest.firstName + ' ' + userRequest.lastName + ' for access api',
      iss: 'from server',
      _id,
      firstName,
      lastName,
      username: userRequest?.username,
      email: userRequest?.email,
      role,
      permissions: userRequest?.permissions,
    };
    this.logger.log('payload sign:', payload);

    const refreshToken = createRefreshToken(payload, this.jwtService, this.configService);

    // update refresh token to database\
    await this.userService.updateUserRefreshTokenById(refreshToken, _id);

    // token in cookie
    response.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      maxAge: +ms(this.configService.get('jwt.refreshExpiresIn', { infer: true })),
    })

    return {
      code: BusinessCode.LOGIN,
      data: {
        access_token: this.jwtService.sign(payload),
        user: {
          _id,
          firstName,
          lastName,
          role,
          permissions: userRequest?.permissions,
        }
      },
    };
  }

  async logout(response: Response, user: IUser) {
    return 'ok';
  }
}
