import { Logger } from '@nestjs/common';
import { Request, Response } from 'express';

const logger = new Logger('CleanupFile');
export async function cleanupFiles(request: Request): Promise<void> {
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

  await Promise.all(
    filesToDelete.map((file) => {
      const publicId = file.filename || file.public_id;
      if (publicId) {
        return this.cloudinaryService.deleteFile(publicId);
      }
    }),
  );
}
