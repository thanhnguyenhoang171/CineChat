import { BusinessCode } from '@common/constants/business-code';
import { ResponseMessage } from '@common/constants/response-message';
import { CloudinaryResponse } from '@interfaces/cloudinary.interface';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiOptions } from 'cloudinary';
import { log } from 'console';
import * as streamifier from 'streamifier';

/**
 * Upload single file
 * @param file: File from Multer
 * @param folderName:  folder name in Cloudinary (ex: 'avatars', 'products')
 */

@Injectable()
export class CloudinaryService {
  uploadSingleFile(
    file: Express.Multer.File,
    folderName: string = 'default',
  ): Promise<CloudinaryResponse> {
    // Validate file
    if (!file || !file.mimetype.startsWith('image')) {
      throw new HttpException(
        {
          code: BusinessCode.INVALID_FILE_TYPE,
          errors: ResponseMessage[BusinessCode.INVALID_FILE_TYPE],
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadOptions: UploadApiOptions = {
        folder: `uploads/${folderName}`,
        resource_type: 'auto', // Automatically detect the file type (image, video, raw )
        transformation: [{ quality: 'auto' }, { fetch_format: 'auto' }], // Optimize image quality and format (type: webp, avif, etc.)
      };
      const uploadStream = cloudinary.uploader.upload_stream(
        uploadOptions,
        (error: CloudinaryResponse, result: CloudinaryResponse) => {
          if (error) {
            log('Cloudinary Upload Error:', error);
            return reject(error);
          }
          log('Cloudinary Upload Result:', result);
          resolve(result);
        },
      );
      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }
}
