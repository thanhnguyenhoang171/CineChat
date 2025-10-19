import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { IUser } from '@interfaces/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Role, RoleDocument } from './schemas/role.schema';
import * as SoftDeleteMongoosePlugin from 'soft-delete-plugin-mongoose';
import { ensureAllModuleExist, ensureModuleExists, isModuleExist, validateMongoId } from '@common/utils/validateUtil';
import { BusinessCode } from '@common/constants/business-code';
import { ResponseMessage } from '@common/constants/response-message';
import { HttpStatusCode } from '@common/constants/http-status-code';
import { Permission, PermissionDocument } from '@modules/permissions/shemas/permission.schema';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role.name)
    private readonly roleModel: SoftDeleteMongoosePlugin.SoftDeleteModel<RoleDocument>,
    @InjectModel(Permission.name)
    private readonly permissionModel: SoftDeleteMongoosePlugin.SoftDeleteModel<PermissionDocument>,
  ) {}

  async createRole(createRoleDto: CreateRoleDto, user: IUser) {
    // Check existed role by name
    const isExistedRole = await isModuleExist(this.roleModel, 'name', createRoleDto.name);
    if (isExistedRole === true) {
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
    const createdRole = await this.roleModel.create({
      ...createRoleDto,
      createdBy: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    });
    // 2nd check existed permission
    // best pratice (reduce query DB)
    await ensureAllModuleExist(
      this.permissionModel,
      createRoleDto.permissions,
      BusinessCode.PERMISSION_NOT_FOUND,
      HttpStatusCode.NOT_FOUND,
    );

    return {
      code: BusinessCode.ROLE_CREATED_SUCCESS,
      data: {
        _id: createdRole._id,
        createdAt: createdRole.createdAt,
      },
    };
  }

  findAll() {
    return `This action returns all roles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
