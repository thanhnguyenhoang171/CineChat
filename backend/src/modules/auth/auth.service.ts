import { passwordCompare } from '@common/utils/password-bcrypt.util';
import { IGGUser, IUser } from '@interfaces/user.interface';
import { RegisterAccountDto, RegisterGGAccountDto } from '@modules/users/dto/create-user.dto';
import { UsersService } from '@modules/users/users.service';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
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
import { LoginProvider } from '@common/constants/common-constant';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private configService: ConfigService<ConfigEnv, true>,
    private jwtService: JwtService,
  ) {}
  private readonly logger = new Logger('AuthService');

  async register(registerAccountDto: RegisterAccountDto) {
    const userData = {
      ...registerAccountDto,
      provider: LoginProvider.USERNAME,
    };
    // return this.userService.registerAccount(registerAccountDto);
    const registeredUser = await this.userService.registerAccount(userData);
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
    const { _id, role } = userRequest;
    const payload = {
      sub: _id,
      r: role._id,
    };

    this.logger.log(' Checking role info = ', role);
    this.logger.log('payload sign:', payload);

    const refreshToken = createRefreshToken(payload, this.jwtService, this.configService);

    // update refresh token to database
    await this.userService.updateUserRefreshTokenById(refreshToken, _id);

    // token in cookie
    response.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      maxAge: +ms(this.configService.get('jwt.refreshExpiresIn', { infer: true })),
      secure: true, // KHUYÊN DÙNG: Bật lên khi deploy Production (HTTPS)
      sameSite: 'none', // KHUYÊN DÙNG: Bật lên nếu FE và BE khác domain
    });

    return {
      code: BusinessCode.LOGIN,
      data: {
        access_token: this.jwtService.sign(payload),
        level: role?.level,
      },
    };
  }

  async getAccount(user: IUser): Promise<any> {
    const result = await this.userService.findUserById(user._id);

    // 2. Trả về đúng format response chuẩn của hệ thống
    return {
      code: BusinessCode.ACCOUNT_INFO, // Ví dụ: 'SYS_004'
      data: result,
    };
  }

  async logout(response: Response, user: IUser) {
    // Remove token in DB
    await this.userService.updateUserRefreshTokenById(null, user._id);

    // Clear cookie in Client
    response.clearCookie('refresh_token', {
      httpOnly: true,
      maxAge: +ms(this.configService.get('jwt.refreshExpiresIn', { infer: true })),
      secure: true, // KHUYÊN DÙNG: Bật lên khi deploy Production (HTTPS)
      sameSite: 'none', // KHUYÊN DÙNG: Bật lên nếu FE và BE khác domain
    });

    return {
      code: BusinessCode.LOGOUT_SUCCESS,
    };
  }

  async refresh(refreshToken: string, response: Response) {
    try {
      // 1. Get configs
      const publicKey = this.configService.get<string>('jwt.publicKey', { infer: true });
      const privateKey = this.configService.get<string>('jwt.privateKey', { infer: true });
      const refreshExpiresIn = this.configService.get<string>('jwt.refreshExpiresIn', {
        infer: true,
      });
      const accessExpiresIn = this.configService.get<string>('jwt.expiresIn', { infer: true });

      // 2. Verify sign of refresh token first
      await this.jwtService.verifyAsync(refreshToken, {
        publicKey: publicKey,
        algorithms: ['RS256'],
        // ignoreIssuer: true, // Bật lên nếu token cũ trong DB đang bị lệch issuer
      });

      // 3. Check DB
      const user = await this.userService.findUserByRefreshToken(refreshToken);
      // console.log("Checking refresh token", user);
      if (!user) {
        throw new UnauthorizedException('Refresh token is not valid or has been revoked');
      }

      // 4. Prepare Payload (FIX QUAN TRỌNG: Phải khớp với hàm login)
      const { _id, firstName, lastName, username, email, role, permissions } = user;

      const payload = {
        sub: _id,
        r: role._id,
      };

      // 5. Sign new refresh token
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

      // 7. Update DB
      await this.userService.updateUserRefreshTokenById(newRefreshToken, _id.toString());

      // 8. Set Cookie again
      response.cookie('refresh_token', newRefreshToken, {
        httpOnly: true,
        secure: true, // KHUYÊN DÙNG: Bật lên khi deploy Production (HTTPS)
        sameSite: 'none', // KHUYÊN DÙNG: Bật lên nếu FE và BE khác domain
        maxAge: +ms(refreshExpiresIn as any),
      });

      // 9. Return result
      return {
        code: BusinessCode.REFRESH_TOKEN_SUCCESS,
        data: {
          access_token: newAccessToken,
        },
      };
    } catch (error) {
      this.logger.error(`Refresh token failed: ${error.message}`);

      // Quan trọng: Phải clear cookie với options giống hệt lúc set
      response.clearCookie('refresh_token', {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      });

      throw new UnauthorizedException({
        code: BusinessCode.UNAUTHORIZED, // Sửa lại mã lỗi cho đúng chuẩn
        message: 'Invalid or expired refresh token',
      });
    }
  }

  async googleLogin(user: IGGUser, response: Response) {
    try {
      if (!user.emailVerified) {
        throw new HttpException(
          {
            code: BusinessCode.EMAIL_NOT_VERIFIED,
            errors: ResponseMessage[BusinessCode.EMAIL_NOT_VERIFIED],
          },
          HttpStatus.FORBIDDEN,
        );
      }

      const registerData = {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        picture: user.picture,
        provider: LoginProvider.GOOGLE,
        googleId: user.googleId,
        emailVerified: user.emailVerified,
      } as RegisterGGAccountDto;

      console.log('Checking register data = ', registerData);

      const existEmailAccount = await this.userService.findUserByEmailAndGoogleId(
        user.email,
        user.googleId,
      );

      let currentUser;

      if (existEmailAccount) {
        currentUser = existEmailAccount;
      } else {
        currentUser = await this.userService.registerGoogleAccount(registerData);
      }

      // sign jwt token
      const payload = {
        sub: currentUser._id,
        r: currentUser.role._id,
      };

      this.logger.log('payload sign:', payload);

      const refreshToken = createRefreshToken(payload, this.jwtService, this.configService);

      // update refresh token to database
      await this.userService.updateUserRefreshTokenById(refreshToken, currentUser._id);
      // token in cookie
      response.cookie('refresh_token', refreshToken, {
        httpOnly: true,
        maxAge: +ms(this.configService.get('jwt.refreshExpiresIn', { infer: true })),
        secure: true, // KHUYÊN DÙNG: Bật lên khi deploy Production (HTTPS)
        sameSite: 'none', // KHUYÊN DÙNG: Bật lên nếu FE và BE khác domain
      });

      const feUri = this.configService.get<string>('clientUri', {
        infer: true,
      });
      const accessToken = this.jwtService.sign(payload);
      response.redirect(
        `${feUri}/auth/google-success?act=${accessToken}&lv=${currentUser?.role?.level}`,
      );
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          code: BusinessCode.INTERNAL_SERVER_ERROR,
          errors: ResponseMessage[BusinessCode.INTERNAL_SERVER_ERROR],
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
