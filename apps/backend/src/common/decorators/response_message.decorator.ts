
import { HttpStatus, SetMetadata } from '@nestjs/common';

export const RESPONSE_STATUS = 'RESPONSE_STATUS';

export const ResponseStatus = (status: HttpStatus) => {
  return SetMetadata('RESPONSE_STATUS', status);
};
