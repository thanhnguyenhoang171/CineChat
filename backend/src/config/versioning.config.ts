import { INestApplication, VersioningType } from '@nestjs/common';

export function setupVersioning(app: INestApplication): void {
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.setGlobalPrefix('api');
}
