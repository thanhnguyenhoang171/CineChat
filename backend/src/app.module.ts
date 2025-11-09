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
import { PaginationService } from '@common/services/pagination.service';
import { CommonModule } from '@common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [envConfig],
      validationSchema: envValidationSchema, // validate biến môi trường
    }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    RolesModule,
    PermissionsModule,
    CommonModule
  ],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*path');
  }
}
