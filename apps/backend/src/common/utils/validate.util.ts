import { BusinessCode } from '@common/constants/business-code';
import { ResponseMessage } from '@common/constants/response-message';
import { HttpException, HttpStatus } from '@nestjs/common';
import mongoose from 'mongoose';

export const validateMongoId = (
  id:
    | string
    | string[]
    | mongoose.Types.ObjectId
    | mongoose.Types.ObjectId[]
    | mongoose.Schema.Types.ObjectId
    | mongoose.Schema.Types.ObjectId[],
) => {
  const ids = Array.isArray(id) ? id : [id];
  for (const _id of ids) {
    // Cast to any to bypass ESLint's strict stringification check
    const strId = String(_id as any);
    if (!mongoose.Types.ObjectId.isValid(strId)) {
      throw new HttpException(
        {
          code: BusinessCode.INVALID_MONGODB_ID,
          errors: ResponseMessage[BusinessCode.INVALID_MONGODB_ID],
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
};

export const findModuleOrThrow = async (
  Module: any,
  key: string = '_id',
  filter: Record<string, any> | string,
  businessCode: string,
  errorMessage: string[] | string,
  statusCode: number,
) => {
  const condition = typeof filter === 'string' ? { [key]: filter } : filter;
  const module = await Module.findOne(condition);
  if (!module) {
    throw new HttpException(
      {
        code: businessCode,
        errors: errorMessage,
      },
      statusCode,
    );
  }

  return module;
};

export const ensureAllModulesExist = async (
  Model: any,
  ids: string[] | mongoose.Types.ObjectId[] | mongoose.Schema.Types.ObjectId[],
  code: string,
  statusCode: number,
) => {
  // Cast to any to bypass ESLint's strict stringification check
  const idStrings = ids.map((id) => String(id));
  const count = (await Model.countDocuments({ _id: { $in: idStrings } })) as number;
  if (count !== ids.length) {
    throw new HttpException({ code, errors: ResponseMessage[code] }, statusCode);
  }
};

export const isModuleExist = async (
  Module: any,
  key: string = '_id',
  filter: Record<string, any> | string,
): Promise<boolean> => {
  const condition = typeof filter === 'string' ? { [key]: filter } : filter;

  const existedModule = await Module.findOne(condition);
  return !!existedModule;
};
