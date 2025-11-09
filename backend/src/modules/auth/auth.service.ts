import { passwordCompare } from '@common/utils/password-bcrypt.util';
import { IUser } from '@interfaces/user.interface';
import { RegisterAccountDto } from '@modules/users/dto/create-user.dto';
import { UsersService } from '@modules/users/users.service';
import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

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
  async login(user: IUser) {
    const payload = {
      sub: 'Token of ' + user.firstName + ' ' + user.lastName + ' for access api',
      iss: 'from server',
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      role: user.role,
    };
    this.logger.log('payload sign:', payload);
    return { access_token: this.jwtService.sign(payload) };
  }

  async logout(response: Response, user: IUser) {
    return 'ok';
  }
}
