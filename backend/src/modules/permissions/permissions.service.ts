import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Permission, PermissionDocument } from '@modules/permissions/schemas/permission.schema';
import * as SoftDeleteMongoosePlugin from 'soft-delete-plugin-mongoose';
import type { IUser } from '@interfaces/user.interface';
import { BusinessCode } from '@common/constants/business-code';
import { ResponseMessage } from '@common/constants/response-message';
import { GetPermissionDto } from './dto/get-permission.dto';
import { validateMongoId } from '@common/utils/validate.util';
import { ensurePermissionExists } from './utils/permission-validator';
import { validateUpdateFields } from '@common/utils/update-field-validator.util';
import { PaginationService } from '@common/modules/pagination/pagination.service';
import mongoose from 'mongoose';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectModel(Permission.name)
    private readonly permissionModel: SoftDeleteMongoosePlugin.SoftDeleteModel<PermissionDocument>,
    private readonly paginationService: PaginationService,
  ) {}

  async createPermission(createPermissionDto: CreatePermissionDto, user: IUser) {
    // check exist permission by apiPath and method
    const existPermission = await this.permissionModel.findOne({
      apiPath: createPermissionDto.apiPath,
      method: createPermissionDto.method,
    });
    if (existPermission) {
      throw new HttpException(
        {
          code: BusinessCode.PERMISSION_ALREADY_EXISTS,
          errors: ResponseMessage[BusinessCode.PERMISSION_ALREADY_EXISTS],
        },
        HttpStatus.CONFLICT,
      );
    }

    const createdPermission = await this.permissionModel.create({
      ...createPermissionDto,
      createdBy: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    });

    return {
      code: BusinessCode.PERMISSION_CREATED_SUCCESS,
      data: {
        _id: createdPermission._id,
        createAt: createdPermission.createdAt,
      },
    };
  }

  async findAllPermissionsWithPagination(getPermissionDto: GetPermissionDto) {
    // Define search fields for permissions
    const searchFields = ['apiPath', 'method', 'module'];
    try {
      const { data, meta } = await this.paginationService.paginate(
        this.permissionModel,
        getPermissionDto,
        searchFields,
      );

      return {
        code: BusinessCode.PERMISSION_GET_SUCCESS,
        message: ResponseMessage[BusinessCode.PERMISSION_GET_SUCCESS],
        data,
        meta,
      };
    } catch (error) {
      throw new HttpException(
        {
          code: BusinessCode.INTERNAL_SERVER_ERROR,
          errors: ResponseMessage[BusinessCode.INTERNAL_SERVER_ERROR],
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async findPermissionById(id: string) {
    // Check valid id
    validateMongoId(id);
    const permissison = await this.permissionModel.findById(id);
    if (!permissison) {
      throw new HttpException(
        {
          code: BusinessCode.PERMISSION_NOT_FOUND,
          errors: ResponseMessage[BusinessCode.PERMISSION_NOT_FOUND],
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return {
      code: BusinessCode.PERMISSION_GET_SUCCESS,
      data: permissison,
    };
  }

  async updatePermissionById(id: string, updatePermissionDto: UpdatePermissionDto, user: IUser) {
    // Check valid id
    validateMongoId(id);

    // check exist permission
    const permission = await ensurePermissionExists(this.permissionModel, id);

    // Check and validate update fields is new value ?
    validateUpdateFields(updatePermissionDto, permission);

    // Check update duplicate apiPath + method
    if (updatePermissionDto.apiPath || updatePermissionDto.method) {
      const duplicatedPermission = await this.permissionModel.findOne({
        apiPath: updatePermissionDto.apiPath || permission.apiPath,
        method: updatePermissionDto.method || permission.method,
        _id: { $ne: id }, // exclude current permission
      });

      if (duplicatedPermission) {
        throw new HttpException(
          {
            code: BusinessCode.PERMISSION_ALREADY_EXISTS,
            errors: ResponseMessage[BusinessCode.PERMISSION_ALREADY_EXISTS],
          },
          HttpStatus.CONFLICT,
        );
      }
    }

    try {
      //update
      const result = await this.permissionModel.findByIdAndUpdate(
        id,
        {
          ...updatePermissionDto,
          updatedBy: {
            _id: user._id,
            username: user.username,
            email: user.email,
          },
        },
        {
          new: true, // return document after update
          runValidators: true,
        },
      );

      if (!result) {
        throw new HttpException(
          {
            code: BusinessCode.PERMISSION_NOT_FOUND,
            errors: ResponseMessage[BusinessCode.PERMISSION_NOT_FOUND],
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        code: BusinessCode.PERMISSION_UPDATED_SUCCESS,
        data: {
          _id: result._id,
          updatedAt: result.updatedAt,
        },
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      if (error instanceof mongoose.Error.StrictModeError) {
        throw new HttpException(
          {
            code: BusinessCode.VALIDATION_FAILED,
            errors: ResponseMessage[BusinessCode.VALIDATION_FAILED],
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      if (error instanceof mongoose.Error.ValidationError) {
        throw new HttpException(
          {
            code: BusinessCode.VALIDATION_FAILED,
            errors: error.message,
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      throw new HttpException(
        {
          code: BusinessCode.INTERNAL_SERVER_ERROR,
          errors: ResponseMessage[BusinessCode.INTERNAL_SERVER_ERROR],
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async removePermisionById(id: string, user: IUser) {
    // Soft delete
    validateMongoId(id);
    await ensurePermissionExists(this.permissionModel, id);

    const result = await this.permissionModel.softDelete({ _id: id });

    if (!result || result.deleted !== 1) {
      throw new HttpException(
        {
          code: BusinessCode.PERMISSION_NOT_FOUND,
          errors: ResponseMessage[BusinessCode.PERMISSION_NOT_FOUND],
        },
        HttpStatus.NOT_FOUND,
      );
    }
    await this.permissionModel.findByIdAndUpdate(
      id,
      {
        deletedBy: {
          _id: user._id,
          username: user.username,
          email: user.email,
        },
      },
      { new: true },
    );

    return {
      code: BusinessCode.PERMISSION_DELETED_SUCCESS,
      data: {
        _id: id,
      },
    };
  }
}
