import { HttpStatusCode } from '@common/constants/http-status-code';
import { SetMetadata } from '@nestjs/common';

export const RESPONSE_STATUS = 'RESPONSE_STATUS';

export const ResponseStatus = (status: HttpStatusCode) => {
  return SetMetadata('RESPONSE_STATUS', status);
};
