import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, RegisterAccountDto, RegisterGGAccountDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as SoftDeleteMongoosePlugin from 'soft-delete-plugin-mongoose';
import mongoose from 'mongoose';
import { BusinessCode } from '@common/constants/business-code';
import { ResponseMessage } from '@common/constants/response-message';
import { findModuleOrThrow, isModuleExist, validateMongoId } from '@common/utils/validate.util';
import { passwordHashing } from '@common/utils/password-bcrypt.util';
import { Role, RoleDocument } from '@modules/roles/schemas/role.schema';
import { INVALID_INPUT } from '@common/constants/Error-code-specific';
import { RoleLevel } from '@common/constants/common-constant';
import { CloudinaryService } from '@common/modules/cloudinary/cloudinary.service';
import { IUser } from '@interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: SoftDeleteMongoosePlugin.SoftDeleteModel<UserDocument>,
    @InjectModel(Role.name)
    private readonly roleModel: SoftDeleteMongoosePlugin.SoftDeleteModel<RoleDocument>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async createNewUser(createUserDto: CreateUserDto) {
    const duplicatedUsername = await this.userModel.findOne({
      username: createUserDto.username,
    });
    if (duplicatedUsername) {
      throw new HttpException(
        {
          code: BusinessCode.DUPLICATE_USERNAME,
          errors: ResponseMessage[BusinessCode.DUPLICATE_USERNAME],
        },
        HttpStatus.CONFLICT,
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
        HttpStatus.CONFLICT,
      );
    }

    const createdUser = await this.userModel.create(createUserDto);

    return {
      code: BusinessCode.USER_CREATED_SUCCESS,
      data: createdUser,
    };
  }

  async findAllUsersWithPagination() {
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
        return null;
      }

      const { password, role, ...userInfo } = user;

      // Handle safe casting
      const roleObj = role as any;
      const permissions = roleObj?.permissions ?? [];

      return {
        ...userInfo,
        password: password, // Need return password to compare
        role: {
          _id: roleObj?._id,
          level: roleObj?.level,
        },
        permissions: permissions,
      };
    } catch (error) {
      console.error('Error in findUserByUsername:', error);
      throw new HttpException(
        {
          code: BusinessCode.INTERNAL_SERVER_ERROR,
          errors: ResponseMessage[BusinessCode.INTERNAL_SERVER_ERROR],
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async findUserByEmailAndGoogleId(email: string, googleId: string) {
    try {
      const user = await this.userModel
        .findOne({
          email: email,
          googleId: googleId,
        })
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
        return null;
      }

      const { role, ...userInfo } = user; // reject googleId

      // Handle safe casting
      const roleObj = role as any;
      const permissions = roleObj?.permissions ?? [];

      return {
        ...userInfo,
        role: {
          _id: roleObj?._id,
          level: roleObj?.level,
        },
        permissions: permissions,
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
  async updateUserById(id: string, updateUserDto: UpdateUserDto) {
    validateMongoId(id);
    const user = await findModuleOrThrow(
      this.userModel,
      '_id',
      id,
      BusinessCode.USER_NOT_FOUND,
      ResponseMessage[BusinessCode.USER_NOT_FOUND],
      HttpStatus.NOT_FOUND,
    );
    try {
      const isDifferent = Object.keys(updateUserDto).some(
        (key) => user[key] !== updateUserDto[key],
      );

      if (!isDifferent) {
        throw new HttpException(
          {
            code: BusinessCode.NO_FIELD_UPDATED,
            errors: ResponseMessage[BusinessCode.NO_FIELD_UPDATED],
          },
          HttpStatus.BAD_REQUEST,
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

  removeUserById(id: number) {
    return `This action removes a #${id} user`;
  }

  async registerAccount(registerAccountDto: RegisterAccountDto) {
    try {
      const { firstName, lastName, picture, username, password, provider } = registerAccountDto;
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
      const userRole = await this.roleModel.findOne({ level: RoleLevel.USER });

      if (!userRole) {
        throw new HttpException(
          {
            code: BusinessCode.ROLE_NOT_FOUND,
            errors: ResponseMessage[BusinessCode.ROLE_NOT_FOUND],
          },
          HttpStatus.NOT_FOUND,
        );
      }

      // Hash password
      const passwordHashed = await passwordHashing(password);

      return await this.userModel.create({
        firstName,
        lastName,
        picture,
        username,
        provider,
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
            code: INVALID_INPUT,
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

  async registerGoogleAccount(registerGGAccountDto: RegisterGGAccountDto) {
    try {
      const { firstName, lastName, picture, googleId, emailVerified, email, provider } =
        registerGGAccountDto;
      // Get user's role
      const userRole = await this.roleModel.findOne({ level: RoleLevel.USER });

      return await this.userModel.create({
        firstName,
        lastName,
        picture,
        provider,
        emailVerified,
        email,
        googleId,
        role: userRole?._id,
      });
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
        HttpStatus.NOT_FOUND,
      );
    }
    return result;
  }

  async findUserByRefreshToken(refreshToken: string | null) {
    try {
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
        return null;
      }

      const { role, ...userInfo } = user;

      // Handle safe casting
      const roleObj = role as any;
      const permissions = roleObj?.permissions ?? [];

      return {
        ...userInfo,

        role: {
          _id: roleObj?._id,
          level: roleObj?.level,
        },
        permissions: permissions,
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

  async findUserById(id: string) {
    try {
      const user = await this.userModel
        .findOne({ _id: id })
        .populate({
          path: 'role',
          model: 'Role',
          populate: {
            path: 'permissions',
            model: 'Permission',
            select: '_id name method apiPath module',
          },
        })
        .select('-password -refreshToken -__v -deletedAt')
        .lean()
        .exec();

      if (!user) {
        throw new HttpException(
          {
            code: BusinessCode.USER_NOT_FOUND,
            errors: ResponseMessage[BusinessCode.USER_NOT_FOUND],
          },
          HttpStatus.NOT_FOUND,
        );
      }

      const { role, ...userInfo } = user;

      // Handle safe casting
      const roleObj = role as any;
      const permissions = roleObj?.permissions ?? [];

      return {
        ...userInfo,
        role: {
          _id: roleObj?._id,
          level: roleObj?.level,
          description: roleObj?.description,
        },
        permissions: permissions,
      };
    } catch (error) {
      // Re-throw business exceptions
      if (error instanceof HttpException) {
        throw error;
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

  async uploadUserAvatarById(user: IUser, folder: string, file: Express.Multer.File) {
    if (!file) {
      throw new HttpException(
        {
          code: BusinessCode.UPLOAD_FILE_FAILD,
          errors: ResponseMessage[BusinessCode.UPLOAD_FILE_FAILD],
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const account = await this.userModel.findById(user._id);
    const oldPublicId = account?.picture?.public_id;

    let newUserAvatar;
    try {
      newUserAvatar = await this.userModel
        .findByIdAndUpdate(
          user._id,
          {
            $set: {
              picture: {
                url: file.path,
                public_id: file.filename,
                folder,
              },
            },
          },
          {
            new: true,
            runValidators: true,
          },
        )
        .lean();

      if (!newUserAvatar) {
        throw new HttpException(
          {
            code: BusinessCode.USER_NOT_FOUND,
            errors: ResponseMessage[BusinessCode.USER_NOT_FOUND],
          },
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (error) {
      //  DB fail → rollback NEW avatar
      await this.cloudinaryService.deleteFile(file.filename);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          code: BusinessCode.INTERNAL_SERVER_ERROR,
          errors: ResponseMessage[BusinessCode.INTERNAL_SERVER_ERROR],
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // DB OK → remove old avatar
    if (oldPublicId) {
      await this.cloudinaryService.deleteFile(oldPublicId);
    }

    return {
      code: BusinessCode.UPLOAD_FILE_SUCCESS,
      data: {
        _id: newUserAvatar._id,
        picture: {
          url: newUserAvatar.picture?.url,
        },
      },
    };
  }

  async deleteUser(id: string): Promise<boolean> {
    validateMongoId(id);
    const user = (await this.userModel.findById(id).populate('role').lean()) as IUser;

    if (!user) {
      throw new HttpException(
        {
          code: BusinessCode.USER_NOT_FOUND,
          errors: ResponseMessage[BusinessCode.USER_NOT_FOUND],
        },
        HttpStatus.NOT_FOUND,
      );
    }

    if (user.role.level === RoleLevel.ADMIN) {
      const adminRoles = await this.roleModel.find({ level: RoleLevel.ADMIN }).select('_id').lean();
      const adminRoleIds = adminRoles.map((role) => role._id.toString());
      const adminCount = await this.userModel.countDocuments({
        role: { $in: adminRoleIds },
        isDeleted: false,
      });

      if (adminCount <= 1) {
        throw new HttpException(
          {
            code: BusinessCode.LAST_ACCOUNT_DELETED,
            errors: ResponseMessage[BusinessCode.LAST_ACCOUNT_DELETED],
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    const result = await this.userModel.softDelete({ _id: id });

    console.log('Checking delete user result = ', result);
    if (!result?.deleted) {
      throw new HttpException(
        {
          code: BusinessCode.CANCEL_ACCOUNT_FAILD,
          errors: 'Xóa thất bại từ phía hệ thống lưu trữ',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return true;
  }

  async getAccountActiveStatus(id: string) {
    const result = await this.userModel.findById(id).select('deleted isActive').lean();
    if (!result) {
      throw new NotFoundException(`User với ID ${id} không tồn tại`);
    }

    return {
      isDeleted: result.isDeleted,
      isActive: result.isActive,
    };
  }
}
