import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  console.log('Check port: ', configService.get('PORT'));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
