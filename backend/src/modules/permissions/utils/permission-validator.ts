import { BusinessCode } from '@common/constants/business-code';
import { HttpStatusCode } from '@common/constants/http-status-code';
import { ResponseMessage } from '@common/constants/response-message';
import { HttpException } from '@nestjs/common';

export const ensurePermissionExists = async (permissionModel: any, id: string) => {
  const permission = await permissionModel.findById(id);
  if (!permission) {
    throw new HttpException(
      {
        code: BusinessCode.PERMISSION_NOT_FOUND,
        errors: ResponseMessage[BusinessCode.PERMISSION_NOT_FOUND],
      },
      HttpStatusCode.NOT_FOUND,
    );
  }
  return permission;
};
