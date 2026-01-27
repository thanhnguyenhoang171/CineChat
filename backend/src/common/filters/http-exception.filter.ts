import { BusinessCode } from '@common/constants/business-code';
import { CloudinaryService } from '@common/modules/cloudinary/cloudinary.service'; // Import Service
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
@Injectable()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  // Inject CloudinaryService
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const exceptionResponse = exception.getResponse();
    let code = BusinessCode.INTERNAL_SERVER_ERROR;
    let errors: string | any = exception.message;

    // Format Error
    if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
      const res = exceptionResponse as Record<string, any>;
      code = res.code || code;

      errors =
        res.errors ??
        res.message ??
        (typeof exception.message === 'string' ? exception.message : [exception.message]);
    }

    this.logger.error(
      `[${request.method}] ${request.url} -> ${status}`,
      typeof errors === 'string' ? errors : JSON.stringify(errors),
    );

    // handle remove file in cloudinary
    try {
      await this.cleanupFiles(request);
    } catch (err) {
      this.logger.warn('Cleanup file failed:', err);
    }


    response.status(status).json({
      status,
      code,
      timestamp: new Date().toISOString(),
      path: request.url,
      errors,
    });
  }


  private async cleanupFiles(request: Request): Promise<void> {
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

    this.logger.warn(`Error detected! Cleaning up ${filesToDelete.length} file(s)...`);

    await Promise.all(
      filesToDelete.map((file) => {
        const publicId = file.filename || file.public_id;
        if (publicId) {
          return this.cloudinaryService.deleteFile(publicId);
        }
      }),
    );
  }
}
