import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { log } from 'console';
import { CommonUtil } from '@common/utils/common.util';
import { ALLOWED_MIME_TYPES, MAX_FILE_SIZE } from '@common/constants/common-constant';
import { HttpException, HttpStatus } from '@nestjs/common';
import { BusinessCode } from '@common/constants/business-code';
import { ResponseMessage } from '@common/constants/response-message';


export const MulterConfig = (cloudinaryInstance: any) => {
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
    limits: {
      fileSize: MAX_FILE_SIZE, // blocked > 5MB
    },
    fileFilter: (req: any, file: any, cb: any) => {
      if (!file.mimetype.match(ALLOWED_MIME_TYPES)) {
        return cb(
          new HttpException(
            {
              code: BusinessCode.INVALID_FILE_TYPE,
              errors: ResponseMessage[BusinessCode.INVALID_FILE_TYPE],
            },
            HttpStatus.UNPROCESSABLE_ENTITY,
          ),
          false,
        );
      }
      cb(null, true);
    },
  };
};