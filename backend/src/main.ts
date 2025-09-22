import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { HttpExceptionFilter } from './filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const reflector = app.get(Reflector);

  app.useGlobalInterceptors(new TransformInterceptor(reflector));
  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalPipes(new ValidationPipe());

  

  // versioning
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.setGlobalPrefix('api');

  // get ip
  app.getHttpAdapter().getInstance().set('trust proxy', true);

  const configService = app.get(ConfigService);
  const PORT = configService.get('PORT') || '0.0.0.0';

  await app.listen(PORT);
}

bootstrap().then(() =>
  console.log(`Server is running on ${process.env.HOST}:${process.env.PORT}`),
);
