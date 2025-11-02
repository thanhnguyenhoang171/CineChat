import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { setupGlobalConfigs } from '@config/global.config';
import { setupCors } from '@config/cors.config';
import { setupVersioning } from '@config/versioning.config';
import { setupSwagger } from '@config/swagger.config';
import { globalValidationPipe } from '@common/pipes/validation.pipe';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(AppModule, {
    snapshot: true,
  });

  globalValidationPipe(app);
  setupGlobalConfigs(app);
  setupCors(app);
  setupVersioning(app);
  setupSwagger(app);

  // Trust proxy (for IP & load balancer support) 
  app.getHttpAdapter().getInstance().set('trust proxy', true);

  // get port from .env
  const configService = app.get(ConfigService);
  const PORT = parseInt(configService.get('port') || '3000', 10);
  const HOST = configService.get<string>('host') || '0.0.0.0'; // always listen all interfaces

  await app.listen(PORT, HOST, () => {
    const url =
      process.env.RENDER_EXTERNAL_URL || process.env.APP_URL || `http://localhost:${PORT}`;

    logger.log(`🚀 Server is running on ${url}`);
    logger.log(`📚 Swagger docs available at ${url}/api/docs`);
    logger.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}

bootstrap();
