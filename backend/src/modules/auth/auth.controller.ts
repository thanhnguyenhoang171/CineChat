import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req, // Đã import Req
  Res
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtPublic } from '@common/decorators/jwt_public.decorator';
import { LoginAccountDto, RegisterAccountDto } from '@modules/users/dto/create-user.dto';
import { HttpStatusCode } from '@common/constants/http-status-code';
import { ResponseStatus } from '@common/decorators/response_message.decorator';
import { LocalAuthGuard } from '@common/guards/local-auth-guard';
import type { Request, Response } from 'express';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @JwtPublic()
  @Post('/register')
  @ApiOperation({ summary: 'Register a new account' })
  @ResponseStatus(HttpStatusCode.CREATED)
  async registerAccount(@Body() registerAccountDto: RegisterAccountDto) {
    return this.authService.register(registerAccountDto);
  }

  @JwtPublic()
  @Post('/login')
  @ApiBody({ type: LoginAccountDto })
  @UseGuards(LocalAuthGuard)
  @ResponseStatus(HttpStatusCode.OK)
  @ApiOperation({ summary: 'Login to system' })
  async loginAccount(
    @Req() req: any,
    @Res({ passthrough: true }) response: Response
  ): Promise<any> {
    return this.authService.login(req.user, response);
  }

  @Post('/logout')
  @ApiOperation({ summary: 'Logout from system' })
  @ResponseStatus(HttpStatusCode.OK)
  async logout(@Req() req: any) {
    return req.logout();
  }
}