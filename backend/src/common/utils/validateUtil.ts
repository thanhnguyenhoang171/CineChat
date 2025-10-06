import { BusinessCode } from '@common/constants/business-code';
import { HttpStatusCode } from '@common/constants/http-status-code';
import { ResponseMessage } from '@common/constants/response-message';
import { HttpException, HttpStatus } from '@nestjs/common';
import mongoose from 'mongoose';

export const validateMongoId = (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new HttpException(
      {
        code: BusinessCode.INVALID_MONGODB_ID,
        errors: ResponseMessage[BusinessCode.INVALID_MONGODB_ID],
      },
      HttpStatusCode.BAD_REQUEST,
    );
  }
};

export const ensureUserExists = async (userModel: any, id: string) => {
  const user = await userModel.findById(id);
  if (!user) {
    throw new HttpException(
      {
        code: BusinessCode.USER_NOT_FOUND,
        errors: ResponseMessage[BusinessCode.USER_NOT_FOUND],
      },
      HttpStatusCode.NOT_FOUND,
    );
  }

  return user;
};
