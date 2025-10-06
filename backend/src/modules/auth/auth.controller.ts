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
import { LocalAuthGuard } from '../../common/guards/local-auth-guard';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtPublic } from '@common/decorators/jwt_public.decorator';
import { LoginAccountDto, RegisterAccountDto } from '@modules/users/dto/create-user.dto';

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
