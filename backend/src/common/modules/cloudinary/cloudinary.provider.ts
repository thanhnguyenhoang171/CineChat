import { v2 as cloudinary, ConfigOptions } from 'cloudinary';
import { ConfigService } from '@nestjs/config';
import { ConfigEnv } from '@config/env.config';

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  useFactory: (configService: ConfigService<ConfigEnv, true>) => {
    const config: ConfigOptions = {
      cloud_name: configService.get<string>('cloudinary.cloudinaryName', { infer: true }),
      api_key: configService.get<string>('cloudinary.cloudinaryApiKey', { infer: true }),
      api_secret: configService.get<string>('cloudinary.cloudinaryApiSecret', { infer: true }),
    };
    cloudinary.config(config);

    return cloudinary;
  },
  inject: [ConfigService],
};
