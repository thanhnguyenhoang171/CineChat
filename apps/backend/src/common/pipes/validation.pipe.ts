import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { INestApplication } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export function globalValidationPipe(app: INestApplication): void {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true, // throw error message when redundant attributes
      transform: true, // auto transform data types
      exceptionFactory: (errors: ValidationError[]) => {
        const formattedErrors = {};
        errors.forEach((error) => {
          if (error.constraints) {
            // Lỗi từ forbidNonWhitelisted có một key đặc biệt là 'whitelistValidation'
            if (error.constraints.whitelistValidation) {
              formattedErrors[error.property] =
                `Thuộc tính '${error.property}' không được phép tồn tại.`;
            } else {
              // Lấy message đầu tiên từ các constraints của class-validator
              formattedErrors[error.property] = Object.values(error.constraints).join(', ');
            }
          }
        });
        return new BadRequestException({
          code: 'SYS_400',
          errors: formattedErrors,
        });
      },
    }),
  );
}
