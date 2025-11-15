import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { BusinessCode } from '@common/constants/business-code';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly logger =  new Logger(LocalStrategy.name);

  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new HttpException({
        code: BusinessCode.UNAUTHORIZED,
        errors: 'Username hoặc Password không chính xác!'
      },
        HttpStatus.UNAUTHORIZED,
        );
    }
    this.logger.log('>>>USER LOCAL STRATEGY: ', user );
    return user; // throw về req.user cho jwt passport sign token
  }
}
