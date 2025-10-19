import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { IUser } from '@interfaces/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Role, RoleDocument } from './schemas/role.schema';
import * as SoftDeleteMongoosePlugin from 'soft-delete-plugin-mongoose';
import { ensureModuleExists } from '@common/utils/validateUtil';
import { BusinessCode } from '@common/constants/business-code';
import { ResponseMessage } from '@common/constants/response-message';
import { HttpStatusCode } from '@common/constants/http-status-code';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role.name)
    private readonly roleModel: SoftDeleteMongoosePlugin.SoftDeleteModel<RoleDocument>,
  ) {}

  async createRole(createRoleDto: CreateRoleDto, user: IUser) {
    // Check existed role by name
    const existedRole = await ensureModuleExists(
      this.roleModel,
      'name',
      createRoleDto.name,
      BusinessCode.ROLE_NOT_FOUND,
      ResponseMessage[BusinessCode.ROLE_NOT_FOUND],
      HttpStatusCode.NOT_FOUND,
    );
    return {
      data: existedRole,
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
