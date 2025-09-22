import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';
import { RegisterAccountDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { passwordCompare } from 'src/utils/passwordBcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService

  ) {}

  async register(registerAccountDto: RegisterAccountDto) {
    return this.userService.registerAccount(registerAccountDto);
  }

  // validate user
  async validateUser(username: string, pass: string): Promise<any>   {
    // get user info by username:
    const user = await this.userService.findUserByUsername(username).lean();

    // decode password and compare
    if (user && await passwordCompare(pass, user.password)) {
      // remove password before return
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // handle login account
  async login(user: any) {
    console.log('user login:', user);
    const payload = { username: user.username, email: user.email, sub: user._id, role: user.role };
    console.log('payload sign:', payload);
    return { access_token: this.jwtService.sign(payload) };
  }
}
