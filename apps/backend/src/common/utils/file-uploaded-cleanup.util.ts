import { CloudinaryService } from '@common/modules/cloudinary/cloudinary.service';
import { Logger } from '@nestjs/common';
import { Request } from 'express';

const logger = new Logger('CleanupFile');
export async function cleanupFiles(
  request: Request,
  cloudinaryService: CloudinaryService,
): Promise<void> {
  const filesToDelete: any[] = [];

  if (request.file) filesToDelete.push(request.file);
  if (request.files) {
    if (Array.isArray(request.files)) {
      filesToDelete.push(...request.files);
    } else {
      Object.values(request.files).forEach((files) => filesToDelete.push(...files));
    }
  }

  if (filesToDelete.length === 0) return;

  logger.warn(`Error detected! Cleaning up ${filesToDelete.length} file(s)...`);

  // Ensure all elements in Promise.all are Promises
  const deletePromises = filesToDelete
    .map((file) => {
      const publicId = (file.filename || file.public_id) as string;
      return publicId ? cloudinaryService.deleteFile(publicId) : null;
    })
    .filter((promise): promise is Promise<any> => promise !== null);

  await Promise.all(deletePromises);
}
