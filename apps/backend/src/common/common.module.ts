import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Import ConfigModule
import { MulterModule } from '@nestjs/platform-express';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { CloudinaryProvider } from './modules/cloudinary/cloudinary.provider';
import { CloudinaryService } from './modules/cloudinary/cloudinary.service';
import { PaginationService } from './modules/pagination/pagination.service';
import { MulterConfig } from '@config/multer.config';


@Global()
@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [ConfigModule],
      inject: ['CLOUDINARY'], // Inject 'CLOUDINARY' Token that created from Provider
      // cloudinaryInstance is cloudinary created from Provider
      useFactory: (cloudinaryInstance) => {
        return MulterConfig(cloudinaryInstance);
      },
    }),
  ],
  providers: [PaginationService, CloudinaryProvider, CloudinaryService],
  exports: [PaginationService, CloudinaryProvider, CloudinaryService, MulterModule],
})
export class CommonModule {}
