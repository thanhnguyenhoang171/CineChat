import { Controller, Post, Body, UseGuards, Req, Res, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtPublic } from '@common/decorators/auth.decorator';
import { LoginAccountDto, RegisterAccountDto } from '@modules/users/dto/create-user.dto';
import { HttpStatusCode } from '@common/constants/http-status-code';
import { ResponseStatus } from '@common/decorators/response_message.decorator';
import { LocalAuthGuard } from '@common/guards/local-auth-guard';
import type { Request, Response } from 'express';
import { User } from '@common/decorators/user.decorator';
import type { IUser } from '@interfaces/user.interface';

@ApiTags('Auth')
@Controller('auth')
@ApiBearerAuth('jwt')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @JwtPublic()
  @Post('/register')
  @ApiOperation({ summary: 'Register a new account' })
  @ResponseStatus(HttpStatusCode.CREATED)
  async registerController(@Body() registerAccountDto: RegisterAccountDto) {
    return this.authService.register(registerAccountDto);
  }

  @JwtPublic()
  @Post('/login')
  @ApiBody({ type: LoginAccountDto })
  @UseGuards(LocalAuthGuard)
  @ResponseStatus(HttpStatusCode.OK)
  @ApiOperation({ summary: 'Login to system' })
  async loginController(
    @Req() req: any,
    @Res({ passthrough: true }) response: Response,
  ): Promise<any> {
    return this.authService.login(req.user, response);
  }

  @Post('/logout')
  @ApiOperation({ summary: 'Logout from system' })
  @ResponseStatus(HttpStatusCode.OK)
  async logoutController(
    @Res({ passthrough: true }) response: Response,
    @User() user: IUser,
  ): Promise<any> {
    return this.authService.logout(response, user);
  }

  @Get('/account')
  @ApiOperation({ summary: 'Get account information' })
  @ResponseStatus(HttpStatusCode.OK)
  async getAccountController(@User() user: IUser): Promise<any> {
    return this.authService.getAccount(user);
  }

  @JwtPublic()
  @Get('/refresh')
  @ApiOperation({ summary: 'Get refresh information' })
  @ResponseStatus(HttpStatusCode.OK)
  async getRefreshController(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<any> {
    const refreshToken = request.cookies["refresh_token"];
    return this.authService.refresh(refreshToken, response);
  }
}
