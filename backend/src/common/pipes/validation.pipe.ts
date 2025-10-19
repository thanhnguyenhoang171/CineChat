import { ValidationPipe } from '@nestjs/common';
import { INestApplication } from '@nestjs/common';

export function globalValidationPipe(app: INestApplication): void {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true, // throw error message when redundant attributes
      transform: true, // auto transform data types
    }),
  );
}
