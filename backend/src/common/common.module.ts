import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // Import ConfigModule
import { MulterModule } from '@nestjs/platform-express';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { CloudinaryProvider } from './modules/cloudinary/cloudinary.provider';
import { CloudinaryService } from './modules/cloudinary/cloudinary.service';
import { PaginationService } from './modules/pagination/pagination.service';
import { log } from 'console';
import { CommonUtil } from './utils/common.util';

@Global()
@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [ConfigModule],
      inject: ['CLOUDINARY'], // Inject 'CLOUDINARY' Token that created from Provider
      // cloudinaryInstance is cloudinary created from Provider
      useFactory: (cloudinaryInstance) => {
        return {
          storage: new CloudinaryStorage({
            cloudinary: cloudinaryInstance,
            params: async (req: any, file) => {
              log('Multer File:', file);
              const userId = req.user?._id || 'guest';
              const folderName = req.query.folder || 'default';
              return {
                folder: `cinechat/${folderName}/${userId}`,
                format: 'webp',
                public_id: CommonUtil.parseFileUploadName(file.originalname),
                resource_type: 'auto',
              };
            },
          }),
        };
      },
    }),
  ],
  providers: [PaginationService, CloudinaryProvider, CloudinaryService], // Nhớ có Provider ở đây
  exports: [PaginationService, CloudinaryProvider, CloudinaryService, MulterModule], // Export MulterModule để các module khác dùng
})
export class CommonModule {}
