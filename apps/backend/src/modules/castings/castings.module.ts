import { Module } from '@nestjs/common';
import { CastingsService } from './castings.service';
import { CastingsController } from './castings.controller';

@Module({
  controllers: [CastingsController],
  providers: [CastingsService],
})
export class CastingsModule {}
