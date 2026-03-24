import { Module } from '@nestjs/common';
import { CastsService } from './casts.service';
import { CastsController } from './casts.controller';

@Module({
  controllers: [CastsController],
  providers: [CastsService],
})
export class CastsModule {}
