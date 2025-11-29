import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto, RegisterAccountDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as SoftDeleteMongoosePlugin from 'soft-delete-plugin-mongoose';
import mongoose from 'mongoose';
import { BusinessCode } from '@common/constants/business-code';
import { ResponseMessage } from '@common/constants/response-message';
import { HttpStatusCode } from '@common/constants/http-status-code';
import { findModuleOrThrow, isModuleExist, validateMongoId } from '@common/utils/validate.util';
import { passwordHashing } from '@common/utils/password-bcrypt.util';
import { CommonConstant } from '@common/constants/common-constant';
import { Role, RoleDocument } from '@modules/roles/schemas/role.schema';
import { INVALID_INPUT } from '@common/constants/Error-code-specific';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: SoftDeleteMongoosePlugin.SoftDeleteModel<UserDocument>,
    @InjectModel(Role.name)
    private readonly roleModel: SoftDeleteMongoosePlugin.SoftDeleteModel<RoleDocument>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const duplicatedUsername = await this.userModel.findOne({
      username: createUserDto.username,
    });
    if (duplicatedUsername) {
      throw new HttpException(
        {
          code: BusinessCode.DUPLICATE_USERNAME,
          errors: ResponseMessage[BusinessCode.DUPLICATE_USERNAME],
        },
        HttpStatusCode.CONFLICT,
      );
    }

    const duplicatedEmail = await this.userModel.findOne({
      email: createUserDto.email,
    });
    if (duplicatedEmail) {
      throw new HttpException(
        {
          code: BusinessCode.DUPLICATE_EMAIL,
          errors: ResponseMessage[BusinessCode.DUPLICATE_EMAIL],
        },
        HttpStatusCode.CONFLICT,
      );
    }

    const createdUser = await this.userModel.create(createUserDto);

    return {
      code: BusinessCode.USER_CREATED_SUCCESS,
      data: createdUser,
    };
  }

  async findAll() {
    return {
      code: BusinessCode.USER_GET_SUCCESS,
      data: await this.userModel.find(),
    };
  }

  async findUserByUsername(username: string) {
    try {
      const user = await this.userModel
        .findOne({ username })
        .populate({
          path: 'role',
          model: 'Role',
          populate: {
            path: 'permissions',
            model: 'Permission',
            select: '_id name method apiPath module',
          },
        })
        .lean()
        .exec();

      if (!user) {
        throw new HttpException(
          {
            code: BusinessCode.USER_NOT_FOUND,
            errors: ResponseMessage[BusinessCode.USER_NOT_FOUND],
          },
          HttpStatusCode.NOT_FOUND,
        );
      }
      const { password, role, ...userInfo } = user;

      // Lấy permissions đã được populate trực tiếp từ đối tượng role
      const permissions = (role as any)?.permissions ?? [];
      const roleId = (role as any)?._id;
      const roleName = (role as any)?.name;

      return {
        ...userInfo,
        password: password, // <-- Giữ lại password HASHED để so sánh trong AuthService
        role: {
          _id: roleId,
          name: roleName,
        },
        permissions: permissions,
      };
    } catch (error) {
      console.log(error);
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        {
          code: BusinessCode.INTERNAL_SERVER_ERROR,
          errors: ResponseMessage[BusinessCode.INTERNAL_SERVER_ERROR],
        },
        HttpStatusCode.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    validateMongoId(id);
    const user = await findModuleOrThrow(
      this.userModel,
      '_id',
      id,
      BusinessCode.USER_NOT_FOUND,
      ResponseMessage[BusinessCode.USER_NOT_FOUND],
      HttpStatusCode.NOT_FOUND,
    );
    try {
      // So sánh giá trị mới với cũ
      const isDifferent = Object.keys(updateUserDto).some(
        (key) => user[key] !== updateUserDto[key],
      );

      if (!isDifferent) {
        throw new HttpException(
          {
            code: BusinessCode.NO_FIELD_UPDATED,
            errors: ResponseMessage[BusinessCode.NO_FIELD_UPDATED],
          },
          HttpStatusCode.BAD_REQUEST,
        );
      }

      const result = await this.userModel.updateOne({ _id: id }, updateUserDto, {
        runValidators: true,
        strict: 'throw',
      });

      return {
        code: BusinessCode.USER_UPDATED_SUCCESS,
        data: result,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        //  Ném lại lỗi nghiệp vụ
        throw error;
      }
      if (error instanceof mongoose.Error.StrictModeError) {
        throw new HttpException(
          {
            code: BusinessCode.VALIDATION_FAILED,
            errors: ResponseMessage[BusinessCode.VALIDATION_FAILED],
          },
          HttpStatusCode.BAD_REQUEST,
        );
      }

      //  Nếu là lỗi validation khác
      if (error instanceof mongoose.Error.ValidationError) {
        throw new HttpException(
          {
            code: BusinessCode.VALIDATION_FAILED,
            errors: error.message,
          },
          HttpStatusCode.BAD_REQUEST,
        );
      }

      // Các lỗi khác → 500
      throw new HttpException(
        {
          code: BusinessCode.INTERNAL_SERVER_ERROR,
          errors: ResponseMessage[BusinessCode.INTERNAL_SERVER_ERROR],
        },
        HttpStatusCode.INTERNAL_SERVER_ERROR,
      );
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async registerAccount(registerAccountDto: RegisterAccountDto) {
    try {
      const { firstName, lastName, picture, username, password } = registerAccountDto;
      const duplicatedUsername = await isModuleExist(this.userModel, 'username', username);

      if (duplicatedUsername) {
        throw new HttpException(
          {
            code: BusinessCode.DUPLICATE_USERNAME,
            errors: ResponseMessage[BusinessCode.DUPLICATE_USERNAME],
          },
          HttpStatus.CONFLICT,
        );
      }

      // Get user's role
      const userRole = await this.roleModel.findOne({ name: CommonConstant.roleLevel.USER });

      if (!userRole) {
        throw new HttpException(
          {
            code: BusinessCode.ROLE_NOT_FOUND,
            errors: ResponseMessage[BusinessCode.ROLE_NOT_FOUND],
          },
          HttpStatusCode.NOT_FOUND,
        );
      }

      // Hash password
      const passwordHashed = await passwordHashing(password);

      // Tạo mới
      return await this.userModel.create({
        firstName,
        lastName,
        picture,
        username,
        password: passwordHashed,
        role: userRole?._id,
      });
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

  async updateUserRefreshTokenById(refreshToken: string | null, id: string) {
    validateMongoId(id);

    const result = await this.userModel.findOneAndUpdate(
      { _id: id },
      { refreshToken },
      { new: true },
    );
    if (!result) {
      throw new HttpException(
        {
          code: BusinessCode.USER_NOT_FOUND,
          errors: ResponseMessage[BusinessCode.USER_NOT_FOUND],
        },
        HttpStatusCode.NOT_FOUND,
      );
    }
    return result;
  }

  async findUserByRefreshToken(refreshToken: string | null) {
    const user = await this.userModel
      .findOne({ refreshToken }, { password: 0 })
      .populate({
        path: 'role',
        model: 'Role',
        populate: {
          path: 'permissions',
          model: 'Permission',
          select: '_id name method apiPath module',
        },
      })
      .lean()
      .exec();

    if (!user) {
      throw new HttpException(
        {
          code: BusinessCode.USER_NOT_FOUND,
          errors: ResponseMessage[BusinessCode.USER_NOT_FOUND],
        },
        HttpStatusCode.NOT_FOUND,
      );
    }

    // Take permissions form role
    const { role, ...userInfo } = user;
    const permissions = (role as any)?.permissions || [];
    const roleId = (role as any)?.id;
    const roleName = (role as any)?.name;

    return {
      ...user,
      role: {
        _id: roleId,
        name: roleName,
      },
      permissions: permissions,
    }
  }
}
