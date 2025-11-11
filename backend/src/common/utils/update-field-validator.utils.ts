import { BusinessCode } from '@common/constants/business-code';
import { HttpStatusCode } from '@common/constants/http-status-code';
import { ResponseMessage } from '@common/constants/response-message';
import { HttpException } from '@nestjs/common';

export function validateUpdateFields(dto: any, schema: any) {
  //Check empty DTO
  if (!dto || Object.keys(dto).length === 0) {
    throw new HttpException(
      {
        code: BusinessCode.EMPTY_UPDATE_DTO,
        errors: ResponseMessage[BusinessCode.EMPTY_UPDATE_DTO],
      },
      HttpStatusCode.BAD_REQUEST,
    );
  }

  // // Compare old and new values
  // const isDifferent = Object.keys(dto).some((key) => schema[key] !== dto[key]);
  //
  // if (!isDifferent) {
  //   throw new HttpException(
  //     {
  //       code: BusinessCode.NO_FIELD_UPDATED,
  //       errors: ResponseMessage[BusinessCode.NO_FIELD_UPDATED],
  //     },
  //     HttpStatusCode.BAD_REQUEST,
  //   );
  // }
}
