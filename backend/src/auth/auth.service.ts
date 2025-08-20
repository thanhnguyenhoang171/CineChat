import { Injectable } from '@nestjs/common';
import { RegisterAccountDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async register(registerAccountDto: RegisterAccountDto) {
    return this.userService.registerAccount(registerAccountDto);
  }
}
