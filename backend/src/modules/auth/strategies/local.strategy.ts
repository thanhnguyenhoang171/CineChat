import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }
  private readonly logger = new Logger(LocalStrategy.name);

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new HttpException('Username hoặc Password không chính xác!', HttpStatus.UNAUTHORIZED);
    }
    this.logger.log('user local strategy:', user);
    return user; // throw về req.user cho jwt passport sign token
  }
}
