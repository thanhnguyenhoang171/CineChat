import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const JwtPublic = () => SetMetadata(IS_PUBLIC_KEY, true);

export const IS_PUBLIC_PERMISSION = 'isPublicPermission';
export const PublicPermission = () => SetMetadata(IS_PUBLIC_PERMISSION, true);