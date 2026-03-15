import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseConfig } from '@config/database.config';
import { PermissionsModule } from '@modules/permissions/permissions.module';
import { UsersModule } from '@modules/users/users.module';
import { AuthModule } from '@modules/auth/auth.module';
import { RolesModule } from '@modules/roles/roles.module';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';
import { AppLoggerMiddleware } from '@middlewares/app-logger.middleware';
import envConfig, { envValidationSchema } from '@config/env.config';
import { DatabaseModule } from '@database/mongoose.module';
import { PaginationService } from '@common/modules/pagination/pagination.service';
import { CommonModule } from '@common/common.module';
import { RedisModule } from './redis/redis.module';
import { HealthModule } from '@modules/health/health.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from '@common/filters/http-exception.filter';
import { CastsModule } from './modules/casts/casts.module';
import { GenresModule } from './modules/genres/genres.module';
import { CastingsModule } from './modules/castings/castings.module';
import { MoviesModule } from './modules/movies/movies.module';
import { VideosModule } from './modules/videos/videos.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [envConfig],
      validationSchema: envValidationSchema, // validate biến môi trường
    }),
    DatabaseModule,
    RedisModule,
    UsersModule,
    AuthModule,
    RolesModule,
    PermissionsModule,
    CommonModule,
    HealthModule,
    CastsModule,
    GenresModule,
    CastingsModule,
    MoviesModule,
    VideosModule,
  ],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*path');
  }
}
