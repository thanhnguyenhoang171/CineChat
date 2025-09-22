import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ResponseMessage } from 'src/decorators/response_message.decorator';
import { LoginAccountDto, RegisterAccountDto } from 'src/users/dto/create-user.dto';
import { LocalAuthGuard } from './local/local-auth-guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @ResponseMessage('Đăng ký tài khoản thành công')
  async registerAccount(@Body() registerAccountDto: RegisterAccountDto) {
    return this.authService.register(registerAccountDto);
  }

  
  @Post('/login')
  @UseGuards(LocalAuthGuard)
  @ResponseMessage('Đăng nhập thành công')
  async lginAccount(@Request() req): Promise<any> {
    return this.authService.login(req.user);
  }

  
  @UseGuards(LocalAuthGuard)
  @ResponseMessage('Đăng xuất thành công')
  @Post('/logout')
  async logout(@Request() req) {
    return req.logout();
  }

}
