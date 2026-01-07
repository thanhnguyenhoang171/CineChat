import { Global, Module } from '@nestjs/common';
import { PaginationService } from '@common/services/pagination.service';
import { CloudinaryService } from '@common/services/cloudinary.service';
import { CloudinaryProvider } from '@common/providers/cloudinary.provider';

@Global()
@Module({
  providers: [PaginationService, CloudinaryService, CloudinaryProvider],
  exports: [PaginationService, CloudinaryService, CloudinaryProvider],
})
export class CommonModule {}