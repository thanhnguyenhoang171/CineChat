import { passwordCompare } from '@common/utils/password-bcrypt.util';
import { IUser } from '@interfaces/user.interface';
import { RegisterAccountDto } from '@modules/users/dto/create-user.dto';
import { UsersService } from '@modules/users/users.service';
import {
  BadRequestException,
  HttpException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { response, Response } from 'express';
import { BusinessCode } from '@common/constants/business-code';
import { createRefreshToken } from '@common/utils/access-token.util';
import { ConfigService } from '@nestjs/config';
import { ConfigEnv } from '@config/env.config';
import ms from 'ms';
import { ResponseMessage } from '@common/constants/response-message';
import { HttpStatusCode } from '@common/constants/http-status-code';

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
        createdAt: registeredUser?.createdAt,
      },
    };
  }

  // validate user
  async validateUser(username: string, pass: string): Promise<any> {
    // get user info by username:
    const userData = await this.userService.findUserByUsername(username);
    // decode password and compare
    if (userData) {
      const isMatch = await passwordCompare(pass, userData.password);
      if (isMatch) {
        // remove password before return
        const { password, __v, refreshToken, ...result } = userData;
        return result;
      }
    }
    return null;
  }

  // handle login account
  async login(userRequest: IUser, response: Response) {
    const { _id, firstName, lastName, role, permissions, email, username, picture } = userRequest;
    const payload = {
      sub: 'Token-' + _id,
      iss: 'from server',
      _id,
      role,
    };

    this.logger.log(" Checking role info = ", role);
    this.logger.log('payload sign:', payload);

    const refreshToken = createRefreshToken(payload, this.jwtService, this.configService);

    // update refresh token to database
    await this.userService.updateUserRefreshTokenById(refreshToken, _id);

    // token in cookie
    response.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      maxAge: +ms(this.configService.get('jwt.refreshExpiresIn', { infer: true })),
    });

    return {
      code: BusinessCode.LOGIN,
      data: {
        access_token: this.jwtService.sign(payload),
        user: {
          _id,
          firstName,
          lastName,
          role,
          permissions,
          email,
          username,
          picture,
        },
      },
    };
  }

  async getAccount(user: IUser): Promise<any> {
    if (!user) {
      throw new HttpException(
        {
          code: BusinessCode.USER_NOT_FOUND,
          errors: ResponseMessage[BusinessCode.USER_NOT_FOUND],
        },
        HttpStatusCode.NOT_FOUND,
      );
    }
    return {
      code: BusinessCode.ACCOUNT_INFO,
      data: user,
    };
  }

  async logout(response: Response, user: IUser) {
    // Remove token in DB
    await this.userService.updateUserRefreshTokenById(null, user._id);

    // Clear cookie in Client
    response.clearCookie('refresh_token');

    return {
      code: BusinessCode.LOGOUT_SUCCESS,
    };
  }

  // TODO: Handle get user info by refresh token
  async refresh(refreshToken: string, response: Response) {
    try {
      // 1. Get configs
      const publicKey = this.configService.get<string>('jwt.publicKey', { infer: true });
      const privateKey = this.configService.get<string>('jwt.privateKey', { infer: true });
      const refreshExpiresIn = this.configService.get<string>('jwt.refreshExpiresIn', {
        infer: true,
      });
      const accessExpiresIn =
        this.configService.get<string>('jwt.accessExpiresIn', { infer: true }) || '15m'; // Default 15m

      // 2. Verify sign of refresh token first
      // Nếu token hết hạn hoặc sai chữ ký, dòng này sẽ throw error nhảy xuống catch
      await this.jwtService.verifyAsync(refreshToken, {
        publicKey: publicKey,
        algorithms: ['RS256'],
      });

      // 3. Check this token is valid with user in DB
      // (Quan trọng: Chống việc dùng token cũ đã bị logout hoặc bị replace)
      const user = await this.userService.findUserByRefreshToken(refreshToken);

      if (!user) {
        throw new UnauthorizedException('Refresh token is not valid or has been revoked');
      }

      // 4. Prepare Payload
      const { _id, firstName, lastName, username, email, role, permissions } = user;
      const payload = {
        sub: 'token refresh', // Hoặc dùng nội dung chuẩn hơn như 'Authentication'
        iss: 'from server',
        _id,
        firstName,
        lastName,
        username,
        email,
        role,
        permissions,
      };

      // 5. Sign new refresh token (Token Rotation)
      const newRefreshToken = this.jwtService.sign(payload, {
        privateKey: privateKey,
        algorithm: 'RS256',
        expiresIn: refreshExpiresIn as any,
      });

      // 6. Sign new access token
      const newAccessToken = this.jwtService.sign(payload, {
        privateKey: privateKey,
        algorithm: 'RS256',
        expiresIn: accessExpiresIn as any,
      });

      // 7. Update DB with new Refresh Token
      await this.userService.updateUserRefreshTokenById(newRefreshToken, _id.toString());

      // 8. Set Cookie again
      response.cookie('refresh_token', newRefreshToken, {
        httpOnly: true,
        // secure: true, // Bật lên nếu chạy HTTPS (Production)
        // sameSite: 'none', // Bật lên nếu Frontend và Backend khác domain
        maxAge: +ms(refreshExpiresIn as any),
      });

      // 9. Return result
      return {
        code: BusinessCode.REFRESH_TOKEN_SUCCESS,
        data: {
          access_token: newAccessToken,
          user: {
            _id,
            firstName,
            lastName,
            email,
            username,
            role,
            permissions,
          },
        },
      };
    } catch (error) {
      this.logger.error(`Refresh token failed: ${error.message}`);

      // Quan trọng: Nếu lỗi (token hết hạn/sai), phải xóa cookie để Client biết đường Logout
      response.clearCookie('refresh_token');

      // Ném lỗi 401 để Frontend interceptor bắt được và chuyển hướng về Login
      throw new UnauthorizedException({
        code: BusinessCode.UNAUTHORIZED || 401,
        message: 'Invalid or expired refresh token',
      });
    }
  }
}
