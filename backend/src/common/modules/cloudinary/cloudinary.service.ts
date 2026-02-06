import { BusinessCode } from '@common/constants/business-code';
import { ResponseMessage } from '@common/constants/response-message';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  private readonly logger = new Logger(CloudinaryService.name);

  async deleteFile(publicId?: string): Promise<boolean> {
    if (!publicId) {
      this.logger.warn('No publicId provided for deletion');
      return false;
    }
    try {
      const result = await cloudinary.uploader.destroy(publicId);

      if (result.result === 'ok') {
        this.logger.log(`Successfully deleted file: ${publicId}`);
        return true;
      }

      this.logger.warn(`Cloudinary deletion issue: ${publicId}. Reason: ${result.result}`);
      return false;
    } catch (error) {
      this.logger.error(`Error deleting file ${publicId}`, error.stack);
      return false;
    }
  }
}
