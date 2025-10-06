import { HttpException, Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Permission, PermissionDocument } from './shemas/permission.schema';
import * as SoftDeleteMongoosePlugin from 'soft-delete-plugin-mongoose';
import type { IUser } from '@interfaces/user.interface';


@Injectable()
export class PermissionsService {
  constructor(
    @InjectModel(Permission.name)
    private readonly permissionModel: SoftDeleteMongoosePlugin.SoftDeleteModel<PermissionDocument>,
  ) {}

  async create(createPermissionDto: CreatePermissionDto, user: IUser) {
    // check exist permission by apiPath and method
    const existPermission = await this.permissionModel.findOne({ apiPath: createPermissionDto.apiPath, method: createPermissionDto.method });
    if (existPermission) {
      throw new HttpException({
        code: 'PERMISSION_EXIST',
        errors: 'Permission with the same apiPath and method already exists',
      }, 400);
    }
    
    console.log("Check user = ", user);
    
    const createdPermission = await this.permissionModel.create({
      ...createPermissionDto,
      createdBy: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    });
    return {
      code: 'PERMISSION_CREATED',
      data: {
        _id: createdPermission._id,
        createAt: createdPermission.createdAt,
      },
    };
  }

  findAll() {
    return `This action returns all permissions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} permission`;
  }

  update(id: number, updatePermissionDto: UpdatePermissionDto) {
    return `This action updates a #${id} permission`;
  }

  remove(id: number) {
    return `This action removes a #${id} permission`;
  }
}
