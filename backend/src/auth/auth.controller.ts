import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ResponseMessage } from 'src/decorators/response_message.decorator';
import { LoginAccountDto, RegisterAccountDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @ResponseMessage('Đăng ký tài khoản thành công')
  async registerAccount(@Body() registerAccountDto: RegisterAccountDto) {
    return this.authService.register(registerAccountDto);
  }

  
  // @Post('/login')
  // @ResponseMessage('Đăng nhập thành công')
  // async lginAccount(@Body() loginAccountDto: LoginAccountDto) {
  //   return this.authService.login(loginAccountDto);
  // }
}
