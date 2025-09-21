import { Injectable } from '@nestjs/common';
import { RegisterAccountDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async register(registerAccountDto: RegisterAccountDto) {
    return this.userService.registerAccount(registerAccountDto);
  }

  // validate user
  async validateUser(username: string, pass: string): Promise<any>   {
    // get user info by username:
    const user = await this.userService.findUserByUsername(username);
    // validate user pass
    if (user?.password === pass) {
      // remove password before return
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
