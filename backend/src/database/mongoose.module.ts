// src/database/mongoose.module.ts
import { DatabaseConfig } from '@config/database.config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

/**
 * DatabaseModule chịu trách nhiệm:
 * - Khởi tạo kết nối MongoDB bằng cấu hình từ DatabaseConfig
 * - Cung cấp MongooseModule cho toàn hệ thống (AppModule)
 */
@Module({
  imports: [MongooseModule.forRootAsync(DatabaseConfig)],
  exports: [MongooseModule],
})
export class DatabaseModule {}
