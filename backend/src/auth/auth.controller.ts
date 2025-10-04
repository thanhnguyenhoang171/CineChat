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
import { LoginAccountDto, RegisterAccountDto } from 'src/users/dto/create-user.dto';
import { LocalAuthGuard } from './local/local-auth-guard';
import { JwtPublic } from 'src/decorators/jwt_public.decorator';
import { ApiBody, ApiTags } from '@nestjs/swagger';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @JwtPublic()
  @Post('/register')
  async registerAccount(@Body() registerAccountDto: RegisterAccountDto) {
    return this.authService.register(registerAccountDto);
  }

  @JwtPublic()
  @Post('/login')
  @ApiBody({ type: LoginAccountDto })
  @UseGuards(LocalAuthGuard)
  async lginAccount(@Request() req): Promise<any> {
    return this.authService.login(req.user);
  }

  @Post('/logout')
  async logout(@Request() req) {
    return req.logout();
  }
}
