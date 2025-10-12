import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Permission, PermissionDocument } from './shemas/permission.schema';
import * as SoftDeleteMongoosePlugin from 'soft-delete-plugin-mongoose';
import type { IUser } from '@interfaces/user.interface';
import { BusinessCode } from '@common/constants/business-code';
import { ResponseMessage } from '@common/constants/response-message';
import { GetPermissionDto } from './dto/get-permissions.dto';
import { HttpStatusCode } from '@common/constants/http-status-code';
import { parseSort } from './utils/parse-sort-string';
import { validateMongoId } from '@common/utils/validateUtil';
import { ensurePermissionExists } from './utils/permission-validator';
import { validateUpdateFields } from '@common/utils/update-field-validator';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectModel(Permission.name)
    private readonly permissionModel: SoftDeleteMongoosePlugin.SoftDeleteModel<PermissionDocument>,
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
          code: BusinessCode.PERMISSION_EXIST,
          errors: ResponseMessage[BusinessCode.PERMISSION_EXIST],
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
      code: BusinessCode.PERMISSION_CREATED,
      data: {
        _id: createdPermission._id,
        createAt: createdPermission.createdAt,
      },
    };
  }

  async findAllPermissionWithPagination(getPermissionsDto: GetPermissionDto) {
    const { page, limit, search, filters, sort, projections } = getPermissionsDto;
    // create basic query
    let query: any = {};
    let options: any = {
      skip: (page - 1) * limit,
      limit: limit,
    };

    const aqp = (await import('api-query-params')).default;

    console.log('Input DTO:', getPermissionsDto);

    // use aqp to parse filters, sort, projections
    if (filters) {
      const parsedFilters = aqp(filters, {
        skipKey: 'skip',
        limitKey: 'limit',
        projectionKey: 'projection',
        sortKey: 'sort',
      });
      query = { ...query, ...parsedFilters.filter };

      // If has merge sort
      if (parsedFilters.sort) {
        options.sort = parsedFilters.sort;
      }

      // If has merge projections
      if (parsedFilters.projection) {
        options.projection = parsedFilters.projection;
      }
    }

    // Handle search (fuzzy search)
    if (search) {
      query.$or = [
        { apiPath: { $regex: search, $options: 'i' } },
        { method: { $regex: search, $options: 'i' } },
        { module: { $regex: search, $options: 'i' } },
      ];
    }

    // Handle projections
    if (projections) {
      const fields = projections.split(',').map((field) => field.trim());
      options.projection = fields.reduce((acc, field) => {
        acc[field] = 1;
        return acc;
      }, {});
    }

    // Handle default sort if not have sort in filters
    if (!options.sort) {
      options.sort = sort ? parseSort(sort) : { createdAt: -1 };
    }

    console.log('--- Final Mongoose Query ---');
    console.log('Query:', JSON.stringify(query, null, 2));
    console.log('Options:', JSON.stringify(options, null, 2));

    try {
      const total = await this.permissionModel.countDocuments(query);
      const data = await this.permissionModel
        .find(query, options.projection || {})
        .sort(options.sort)
        .skip(options.skip)
        .limit(options.limit)
        .populate(options.populate || [])
        .lean();
      return {
        code: BusinessCode.PERMISSION_GET_ALL_SUCCESS,
        message: ResponseMessage[BusinessCode.PERMISSION_GET_ALL_SUCCESS],
        data,
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      throw new HttpException(
        {
          code: BusinessCode.INTERNAL_ERROR,
          errors: ResponseMessage[BusinessCode.INTERNAL_ERROR],
        },
        HttpStatusCode.INTERNAL_SERVER_ERROR,
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
      code: BusinessCode.PERMISSION_SUCCESS,
      data: permissison,
    };
  }

  async updatePermissionById(id: string, updatePermissionDto: UpdatePermissionDto, user: IUser) {
    // Check valid id
    validateMongoId(id);

    // check exist permission
    const permission = await ensurePermissionExists(this.permissionModel, id);

    // Validate update fields
    validateUpdateFields(updatePermissionDto, permission);

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
          code: BusinessCode.PERMISSION_UPDATED_FAIL,
          errors: ResponseMessage[BusinessCode.PERMISSION_UPDATED_FAIL],
        },
        HttpStatusCode.BAD_REQUEST,
      );
    }

    return {
      code: BusinessCode.PERMISSION_UPDATED,
      data: {
        _id: result._id,
        updatedAt: result.updatedAt,
      },
    };
  }

  async removePermisionById(id: string, user: IUser) {
    // Soft delete
    validateMongoId(id);
    await ensurePermissionExists(this.permissionModel, id);

    const result = await this.permissionModel.softDelete({ _id: id });

    if (!result || result.deleted !== 1) {
      throw new HttpException(
        {
          code: BusinessCode.PERMISSION_DELETED_FAIL,
          errors: ResponseMessage[BusinessCode.PERMISSION_DELETED_FAIL],
        },
        HttpStatusCode.BAD_REQUEST,
      );
    }

    const deletedPermission = await this.permissionModel.findByIdAndUpdate(
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

    if (!deletedPermission) {
      throw new HttpException(
        {
          code: BusinessCode.PERMISSION_DELETED_FAIL,
          errors: ResponseMessage[BusinessCode.PERMISSION_DELETED_FAIL],
        },
        HttpStatusCode.BAD_REQUEST,
      );
    }

    return {
      code: BusinessCode.PERMISSION_DELETED,
      data: {
        _id: id,
      },
    };
  }
}
