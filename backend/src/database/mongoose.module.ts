import { DatabaseConfig } from '@config/database.config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [MongooseModule.forRootAsync(DatabaseConfig)],
  exports: [MongooseModule],
})
export class DatabaseModule {}
