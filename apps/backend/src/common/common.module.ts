import { Global, Module } from '@nestjs/common';
import { PaginationModule } from './modules/pagination/pagination.module';
import { CloudinaryModule } from './modules/cloudinary/cloudinary.module';

@Global()
@Module({
  imports: [PaginationModule, CloudinaryModule],
  controllers: [],
  providers: [],
  exports: [PaginationModule, CloudinaryModule],
})
export class CommonModule {}
