import { Injectable, Logger } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  private readonly logger = new Logger(CloudinaryService.name);

  /**
   * Xóa file trên Cloudinary bằng Public ID
   * @param publicId ID của ảnh (VD: uploads/default/avatar-123)
   */
  async deleteFile(publicId: string): Promise<boolean> {
    try {
      const result = await cloudinary.uploader.destroy(publicId);

      if (result.result === 'ok') {
        this.logger.log(`Deleted file: ${publicId}`);
        return true;
      } else {
        this.logger.warn(`Failed to delete file: ${publicId}. Reason: ${result.result}`);
        return false;
      }
    } catch (error) {
      this.logger.error(`Error deleting file ${publicId}`, error);
      throw error;
    }
  }


  async handleUploadFile(publicId: string): Promise<boolean> {
    try {
      const result = await cloudinary.uploader.destroy(publicId);

      if (result.result === 'ok') {
        this.logger.log(`Deleted file: ${publicId}`);
        return true;
      } else {
        this.logger.warn(`Failed to delete file: ${publicId}. Reason: ${result.result}`);
        return false;
      }
    } catch (error) {
      this.logger.error(`Error deleting file ${publicId}`, error);
      throw error;
    }
  }

  // Sau này có thể thêm hàm getInfo, createUrl...
}
