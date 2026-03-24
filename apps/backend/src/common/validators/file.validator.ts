import { HttpStatus, ParseFilePipeBuilder } from '@nestjs/common';

export function CreateImageValidator(options: { maxSizeMb: number;  }) {
  const { maxSizeMb } = options;

  return new ParseFilePipeBuilder()
    .addMaxSizeValidator({
      maxSize: 1024 * 1024 * maxSizeMb,
      message: `File too large`,
    })
    .build({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    });
}

export const AvatarValidator = CreateImageValidator({ maxSizeMb: 2 }); // Avatar max 2MB
export const BannerValidator = CreateImageValidator({ maxSizeMb: 5 }); // Banner max 5MB
