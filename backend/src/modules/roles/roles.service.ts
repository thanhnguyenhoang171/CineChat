import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { IUser } from '@interfaces/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Role, RoleDocument } from './schemas/role.schema';
import * as SoftDeleteMongoosePlugin from 'soft-delete-plugin-mongoose';
import {
  ensureAllModulesExist,
  findModuleOrThrow,
  isModuleExist,
  validateMongoId,
} from '@common/utils/validate.util';
import { BusinessCode } from '@common/constants/business-code';
import { ResponseMessage } from '@common/constants/response-message';
import { HttpStatusCode } from '@common/constants/http-status-code';
import { Permission, PermissionDocument } from '@modules/permissions/schemas/permission.schema';
import { GetRoleDto } from '@modules/roles/dto/get-role.dto';
import { PaginationService } from '@common/services/pagination.service';
import { validateUpdateFields } from '@common/utils/update-field-validator.util';
import { INVALID_INPUT } from '@common/constants/Error-code-specific';

@Injectable()
class RolesService {
  constructor(
    @InjectModel(Role.name)
    private readonly roleModel: SoftDeleteMongoosePlugin.SoftDeleteModel<RoleDocument>,
    @InjectModel(Permission.name)
    private readonly permissionModel: SoftDeleteMongoosePlugin.SoftDeleteModel<PermissionDocument>,
    private readonly paginationService: PaginationService,
  ) {}

  async createRole(createRoleDto: CreateRoleDto, user: IUser) {
    // Check existed role by name
    const isExistedRole = await isModuleExist(this.roleModel, 'name', createRoleDto.name);
    if (isExistedRole) {
      throw new HttpException(
        {
          code: BusinessCode.ROLE_ALREADY_EXISTS,
          errors: ResponseMessage[BusinessCode.ROLE_ALREADY_EXISTS],
        },
        HttpStatus.CONFLICT,
      );
    }

    // Check valid permission
    // 1st valid mongoId
    validateMongoId(createRoleDto.permissions);

    // 2nd check existed permission
    await ensureAllModulesExist(
      this.permissionModel,
      createRoleDto.permissions,
      BusinessCode.PERMISSION_NOT_FOUND,
      HttpStatusCode.NOT_FOUND,
    );

    const createdRole = await this.roleModel.create({
      ...createRoleDto,
      createdBy: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    });

    return {
      code: BusinessCode.ROLE_CREATED_SUCCESS,
      data: {
        _id: createdRole._id,
        createdAt: createdRole.createdAt,
      },
    };
  }

  // async findAllRoleWithPagination(getRoleDto: GetRoleDto) {
  //   const { page, limit, search, filters, sort, projections, populate } = getRoleDto;
  //
  //   let query: any = {};
  //   let options: any = {
  //     skip: (page - 1) * limit,
  //     limit: limit,
  //   };
  //
  //   const aqp = (await import('api-query-params')).default;
  //
  //   if (filters) {
  //     const parsedFilters = aqp(filters, {
  //       skipKey: 'skip',
  //       limitKey: 'limit',
  //       projectionKey: 'projection',
  //       sortKey: 'sort',
  //     });
  //     query = { ...query, ...parsedFilters.filter };
  //     if (parsedFilters.sort) {
  //       options.sort = parsedFilters.sort;
  //     }
  //
  //     if (parsedFilters.projection) {
  //       options.projection = parsedFilters.projection;
  //     }
  //   }
  //
  //   if (search) {
  //     query.$or = [
  //       { name: { $regex: search, $options: 'i' } },
  //       { description: { $regex: search, $options: 'i' } },
  //     ];
  //   }
  //
  //   if (projections) {
  //     const fields = projections.split(',').map((field) => field.trim());
  //     options.projection = fields.reduce((acc, field) => {
  //       acc[field] = 1;
  //       return acc;
  //     }, {});
  //   }
  //
  //   if (!options.sort) {
  //     options.sort = sort ? parseSort(sort) : { createdAt: -1 };
  //   }
  //
  //   if (populate) {
  //     // Tách chuỗi populate thành mảng, ví dụ: "permissions,user" -> ["permissions", "user"]
  //     const fieldsToPopulate = populate.split(',').map((field) => field.trim());
  //
  //     const populateOptions: any[] = [];
  //
  //     fieldsToPopulate.forEach((field) => {
  //       if (field === 'permissions') {
  //         // Nếu là 'permissions', dùng rule select cụ thể
  //         populateOptions.push({
  //           path: 'permissions',
  //           select: 'name method apiPath module description',
  //         });
  //       } else {
  //         // Với các trường khác, populate bình thường
  //         populateOptions.push({ path: field });
  //         // Hoặc đơn giản là: populateOptions.push(field);
  //       }
  //     });
  //
  //     options.populate = populateOptions;
  //   }
  //
  //   console.log('--- Final Role Mongoose Query ---');
  //   console.log('Query:', JSON.stringify(query, null, 2));
  //   console.log('Options:', JSON.stringify(options, null, 2));
  //
  //   try {
  //     const total = await this.roleModel.countDocuments(query);
  //     const data = await this.roleModel
  //       .find(query, options.projection || {})
  //       .sort(options.sort)
  //       .skip(options.skip)
  //       .limit(options.limit)
  //       .populate(options.populate || [])
  //       .lean();
  //
  //     return {
  //       code: BusinessCode.ROLE_GET_SUCCESS,
  //       message: ResponseMessage[BusinessCode.ROLE_GET_SUCCESS],
  //       data,
  //       meta: {
  //         total,
  //         page,
  //         limit,
  //         totalPages: Math.ceil(total / limit),
  //       },
  //     };
  //   } catch (error) {
  //     throw new HttpException(
  //       {
  //         code: BusinessCode.INTERNAL_SERVER_ERROR,
  //         errors: ResponseMessage[BusinessCode.INTERNAL_SERVER_ERROR],
  //       },
  //       HttpStatusCode.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }

  async findAllRolesWithPagination(getRoleDto: GetRoleDto) {
    const { populate } = getRoleDto;
    //   1. Define a specific logic populate for role
    let customPopulateOptions: any[] | undefined;
    if (populate) {
      const fieldsToPopulate = populate.split(',').map((field) => field.trim());

      customPopulateOptions = fieldsToPopulate.map((field) => {
        if (field === 'permissions') {
          // Define special Rule for 'permissions'
          return {
            path: 'permissions',
            select: 'name method apiPath module',
          };
        }
        return { path: field }; // default rule
      });
    }

    //   2. Define specific fields for role
    const searchFields = ['name', 'description'];

    try {
      //   3. Call common service
      const { data, meta } = await this.paginationService.paginate(
        this.roleModel,
        getRoleDto,
        searchFields,
        customPopulateOptions,
      );

      //   4. Return response
      return {
        code: BusinessCode.ROLE_GET_SUCCESS,
        message: ResponseMessage[BusinessCode.ROLE_GET_SUCCESS],
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

  async findRoleById(_id: string) {
    validateMongoId(_id);
    const role = await this.roleModel.findById(_id);
    if (!role) {
      throw new HttpException(
        {
          code: BusinessCode.ROLE_NOT_FOUND,
          errors: ResponseMessage[BusinessCode.ROLE_NOT_FOUND],
        },
        HttpStatusCode.NOT_FOUND,
      );
    }
    console.log('Check role: ', role);
    return {
      code: BusinessCode.ROLE_ALREADY_EXISTS,
      data: role,
    };
  }

  async updateRoleById(id: string, updateRoleDto: UpdateRoleDto, user: IUser) {
    // Check valid mongoId
    validateMongoId(id);

    // Ensure existed role
    const role = await findModuleOrThrow(
      this.roleModel,
      '_id',
      id,
      BusinessCode.ROLE_NOT_FOUND,
      ResponseMessage[BusinessCode.ROLE_NOT_FOUND],
      HttpStatusCode.NOT_FOUND,
    );

    // Check has new values updated?
    validateUpdateFields(updateRoleDto, role);

    // Check is duplicated role's name
    if (updateRoleDto.name) {
      const duplicatedRole = await this.roleModel.findOne({
        name: updateRoleDto.name || role.name,
        _id: { $ne: id },
      });
      if (duplicatedRole) {
        throw new HttpException(
          {
            code: BusinessCode.ROLE_ALREADY_EXISTS,
            errors: ResponseMessage[BusinessCode.ROLE_ALREADY_EXISTS],
          },
          HttpStatus.CONFLICT,
        );
      }
    }

    try {
      // Dùng $set để update có chủ đích hơn
      const updatedRole = await this.roleModel.findByIdAndUpdate(
        id, // findByIdAndUpdate chỉ cần id là đủ
        {
          $set: { // Dùng $set
            ...updateRoleDto,
            updatedBy: {
              _id: user._id,
              username: user?.username,
              email: user?.email,
            },
          }
        },
        {
          new: true,
          runValidators: true,
        },
      ).lean(); // Thêm .lean() nếu bạn không cần Mongoose document

      // Check after updating role
      if (!updatedRole) {
        throw new HttpException(
          {
            code: BusinessCode.ROLE_NOT_FOUND,
            errors: ResponseMessage[BusinessCode.ROLE_NOT_FOUND],
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        code: BusinessCode.ROLE_UPDATED_SUCCESS,
        data: {
          _id: updatedRole._id,
          updatedAt: updatedRole.updatedAt,
        },
      };
    } catch (error) {
      // Re-throw business exceptions
      if (error instanceof HttpException) {
        throw error;
      }

      // Catching errors from Mongoose Schema
      if (error.name === 'ValidationError') {
        throw new HttpException(
          {
            code: INVALID_INPUT, // Hoặc một mã lỗi validation chung
            errors: error.message, // Lấy thông báo lỗi trực tiếp từ Mongoose
          },
          HttpStatus.BAD_REQUEST, // 400
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

  async removeRoleById(id: string, user: IUser ) {
    // Soft delete
    validateMongoId(id);
    await isModuleExist(this.roleModel,'_id' ,id);

    const result = await this.roleModel.softDelete({ _id: id });

    if (!result || result.deleted !== 1) {
      throw new HttpException(
        {
          code: BusinessCode.ROLE_NOT_FOUND,
          errors: ResponseMessage[BusinessCode.ROLE_NOT_FOUND],
        },
        HttpStatusCode.NOT_FOUND,
      );
    }
    await this.roleModel.findByIdAndUpdate(
      id,
      {
        deletedBy: {
          _id: user._id,
          username: user?.username,
          email: user?.email,
        },
      },
      { new: true },
    );

    return {
      code: BusinessCode.ROLE_DELETED_SUCCESS,
      data: {
        _id: id,
      },
    };
  }
}

export default RolesService;
