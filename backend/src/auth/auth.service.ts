import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { access } from 'fs';
import { RegisterAccountDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { passwordCompare } from 'src/utils/passwordBcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  private readonly logger = new Logger('AuthService');
  async register(registerAccountDto: RegisterAccountDto) {
    return this.userService.registerAccount(registerAccountDto);
  }

  // validate user
  async validateUser(username: string, pass: string): Promise<any> {
    // get user info by username:
    const user = await this.userService.findUserByUsername(username);

    const userData = user.data;
    // decode password and compare
    if (userData && (await passwordCompare(pass, userData.password))) {
      // remove password before return
      const { password, ...result } = userData;
      return result;
    }
    return null;
  }

  // handle login account
  async login(user: any) {
    const payload = {
      username: user.username,
      email: user.email,
      sub: user._id,
      role: user.role,
    };
    this.logger.log('payload sign:', payload);
    return { access_token: this.jwtService.sign(payload) };
  }

  async logout(response: Response, user: any) {}
}
