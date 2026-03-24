import { BusinessCode } from '@common/constants/business-code';
import { ResponseMessage } from '@common/constants/response-message';
import { HttpException, HttpStatus } from '@nestjs/common';

export const ensurePermissionExists = async (permissionModel: any, id: string) => {
  const permission = await permissionModel.findById(id);
  if (!permission) {
    throw new HttpException(
      {
        code: BusinessCode.PERMISSION_NOT_FOUND,
        errors: ResponseMessage[BusinessCode.PERMISSION_NOT_FOUND],
      },
      HttpStatus.NOT_FOUND,
    );
  }
  return permission;
};
