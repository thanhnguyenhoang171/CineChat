import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

// TODO: Implement file validation logic // src: https://bhargavacharyb.medium.com/nestjs-15-validating-multiple-file-uploads-in-nestjs-using-custom-pipe-ce75889c9768
@Injectable()
export class FileValidationPipe implements PipeTransform {
  transform(value: Express.Multer.File, metadata: ArgumentMetadata) {
    console.log('FileValidationPipe - value:', value);

    return value;
  }
}
