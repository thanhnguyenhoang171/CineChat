import { SetMetadata } from '@nestjs/common';
import { HttpStatusCode } from 'src/types/http-status/http-status-code';

export const RESPONSE_STATUS = 'RESPONSE_STATUS';

export const ResponseStatus = (status: HttpStatusCode) => {
  return SetMetadata('RESPONSE_STATUS', status);
};
