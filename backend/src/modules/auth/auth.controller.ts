import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Res,
  Get,
  UnauthorizedException,
  HttpException,
  HttpStatus,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtPublic, PublicPermission } from '@common/decorators/auth.decorator';
import { LoginAccountDto, RegisterAccountDto } from '@modules/users/dto/create-user.dto';
import { ResponseStatus } from '@common/decorators/response_message.decorator';
import { LocalAuthGuard } from '@common/guards/local-auth-guard';
import type { Request, Response } from 'express';
import { User } from '@common/decorators/user.decorator';
import type { IGGUser, IUser } from '@interfaces/user.interface';
import { AuthGuard } from '@nestjs/passport';
import { BusinessCode } from '@common/constants/business-code';
import { ResponseMessage } from '@common/constants/response-message';

@ApiTags('Auth')
@Controller('auth')
@ApiBearerAuth('jwt')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @JwtPublic()
  @Post('/register')
  @ApiOperation({ summary: 'Register a new account' })
  @ResponseStatus(HttpStatus.CREATED)
  async registerController(@Body() registerAccountDto: RegisterAccountDto) {
    console.log('Checking register account dto = ', registerAccountDto);
    return this.authService.register(registerAccountDto);
  }

  @JwtPublic()
  @Post('/login')
  @ApiBody({ type: LoginAccountDto })
  @UseGuards(LocalAuthGuard)
  @ResponseStatus(HttpStatus.OK)
  @ApiOperation({ summary: 'Login to system' })
  async loginController(
    @Req() req: any,
    @Res({ passthrough: true }) response: Response,
  ): Promise<any> {
    return this.authService.login(req.user, response);
  }

  @Post('/logout')
  @PublicPermission()
  @ApiOperation({ summary: 'Logout from system' })
  @ResponseStatus(HttpStatus.OK)
  async logoutController(
    @Res({ passthrough: true }) response: Response,
    @User() user: IUser,
  ): Promise<any> {
    return this.authService.logout(response, user);
  }

  @Get('/account')
  @PublicPermission()
  @ApiOperation({ summary: 'Get account information' })
  @ResponseStatus(HttpStatus.OK)
  async getAccountController(@User() user: IUser): Promise<any> {
    return this.authService.getAccount(user);
  }

  @Delete('cancel-account')
  @PublicPermission()
  @ApiOperation({ summary: 'Cancel account from system' })
  @ResponseStatus(HttpStatus.OK)
  async delAccountController(
    @Res({ passthrough: true }) response: Response,
    @User() user: IUser,
  ): Promise<any> {
    return this.authService.cancelAccount(user, response);
  }

  @JwtPublic()
  @Post('/refresh')
  @ApiOperation({ summary: 'Get refresh information' })
  @ResponseStatus(HttpStatus.OK)
  async getRefreshController(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<any> {
    const refreshToken = request.cookies?.['refresh_token'];
    return this.authService.refresh(refreshToken, response);
  }

  @Post('/change-password')
  @ApiOperation({ summary: 'Change password' })
  @HttpCode(HttpStatus.OK)
  async changePasswordController(
    @User() user: IUser,
    @Body() body: { currentPassword: string; newPassword: string },
    @Res({ passthrough: true }) response: Response,
  ): Promise<any> {
    return this.authService.changePassword(user, body.currentPassword, body.newPassword, response);
  }

  @JwtPublic()
  @Get('google')
  @ResponseStatus(HttpStatus.OK)
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @JwtPublic()
  @Get('google/callback')
  @ResponseStatus(HttpStatus.OK)
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: Request, @Res() response: Response) {
    if (!req.user) {
      throw new HttpException(
        {
          code: BusinessCode.GOOGLE_AUTH_FAILED,
          errors: ResponseMessage[BusinessCode.GOOGLE_AUTH_FAILED],
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    return this.authService.googleLogin(req.user as IGGUser, response);
  }
}
