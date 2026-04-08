import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, RegisterAccountDto, RegisterGGAccountDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import type { SoftDeleteModel } from 'mongoose-delete';
import mongoose from 'mongoose';
import { BusinessCode } from '@common/constants/business-code';
import { ResponseMessage } from '@common/constants/response-message';
import { findModuleOrThrow, isModuleExist, validateMongoId } from '@common/utils/validate.util';
import { passwordCompare, passwordHashing } from '@common/utils/password-bcrypt.util';
import { Role, RoleDocument } from '@modules/roles/schemas/role.schema';
import { INVALID_INPUT } from '@common/constants/Error-code-specific';
import { RoleLevel } from '@common/constants/common-constant';
import { CloudinaryService } from '@common/modules/cloudinary/cloudinary.service';
import { IUser } from '@cinechat/types';
import { GetUserListToSignRoleDto } from './dto/get-user.dto';
import { PaginationService } from '@common/modules/pagination/pagination.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly paginationService: PaginationService,
    private readonly cloudinaryService: CloudinaryService,

    @InjectModel(User.name)
    private readonly userModel: SoftDeleteModel<UserDocument>,
    @InjectModel(Role.name)
    private readonly roleModel: SoftDeleteModel<RoleDocument>,
  ) {}

  // Use for logic Authentication
  async findUserByUsernameForValidate(username: string) {
    try {
      const user = await this.userModel
        .findOne({ username })
        .select('password isDeleted isActive')
        .lean()
        .exec();

      if (!user) {
        return null;
      }

      return user;
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

  // Use for logic Authentication
  async findUserByIdForValidate(id: string) {
    try {
      const user = await this.userModel
        .findOne({ _id: id })
        .select('password isDeleted isActive tokenVersion')
        .lean()
        .exec();

      if (!user) {
        return null;
      }

      return user;
    } catch (error) {
      console.error('Error in findUserByUsernameForValidate:', error);
      throw new HttpException(
        {
          code: BusinessCode.INTERNAL_SERVER_ERROR,
          errors: ResponseMessage[BusinessCode.INTERNAL_SERVER_ERROR],
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // use for logic 3rd Authentication
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
          select: '_id level',
        })
        .lean()
        .exec();

      if (!user) {
        return null;
      }

      return user;
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

  // use for Account
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

  // use for Authentication
  async registerUserAccount(registerAccountDto: RegisterAccountDto) {
    try {
      const {
        firstName,
        lastName,
        username,
        password,
        provider,
        gender,
        dateOfBirth,
        phoneNumber,
      } = registerAccountDto;

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
      const userRole = await this.roleModel
        .findOne({ level: RoleLevel.USER })
        .select('_id')
        .lean()
        .exec();

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
        gender,
        dateOfBirth,
        phoneNumber,
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

  // use for 3rd Authentication
  async registerGoogleAccount(registerGGAccountDto: RegisterGGAccountDto) {
    try {
      const { firstName, lastName, picture, googleId, emailVerified, email, provider } =
        registerGGAccountDto;

      // Get user's role
      const userRole = await this.roleModel
        .findOne({ level: RoleLevel.USER })
        .select('_id')
        .lean()
        .exec();

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

  // use for Authentication
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

  // use for Authentication
  async findUserByRefreshToken(refreshToken: string | null) {
    try {
      const user = await this.userModel
        .findOne({ refreshToken })
        .select('isDeleted isActive role tokenVersion')
        .lean()
        .exec();

      if (!user) {
        return null;
      }

      return user;
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

  // use for Account
  async findUserById(id: string): Promise<any> {
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

  // use for Account
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
    const oldPublicId = account?.picture?.publicId;

    let newUserAvatar;
    try {
      newUserAvatar = await this.userModel
        .findByIdAndUpdate(
          user._id,
          {
            $set: {
              picture: {
                url: file.path,
                publicId: file.filename,
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

  // use for Account
  async deleteUser(id: string): Promise<boolean> {
    validateMongoId(id);
    const user = (await this.userModel.findById(id).populate('role').lean()) as unknown as IUser;

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
        deleted: false,
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
    const result = await this.userModel.delete({ _id: id });

    console.log('Checking delete user result = ', result);
    // mongoose-delete's delete method returns the updated document or result
    if (!result) {
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

  // use for Account
  async updateFullNameById(user: IUser, firstName: string, lastName: string) {
    const id = user._id;
    console.log('Checking user id in service = ', id);
    const foundUser = await findModuleOrThrow(
      this.userModel,
      '_id',
      id,
      BusinessCode.USER_NOT_FOUND,
      ResponseMessage[BusinessCode.USER_NOT_FOUND],
      HttpStatus.NOT_FOUND,
    );

    if (foundUser.firstName === firstName && foundUser.lastName === lastName) {
      throw new HttpException(
        {
          code: BusinessCode.NO_FIELD_UPDATED,
          errors: ResponseMessage[BusinessCode.NO_FIELD_UPDATED],
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const result = await this.userModel.updateOne(
      { _id: id },
      { firstName, lastName },
      {
        runValidators: true,
        strict: 'throw',
      },
    );

    return {
      code: BusinessCode.USER_UPDATED_SUCCESS,
      data: result.matchedCount === 1 ? { _id: id, firstName, lastName } : null,
    };
  }

  // use for Account
  async changePasswordById(user: IUser, currentPassword: string, newPassword: string) {
    // 1. ÉP LẤY PASSWORD VÀ TOKEN_VERSION (nếu bạn có cấu hình select: false trong Schema)
    const foundUser = await this.userModel
      .findById(user._id)
      .select('+password tokenVersion')
      .exec();

    if (!foundUser) {
      throw new HttpException(
        { code: BusinessCode.UNAUTHORIZED, errors: 'Không tìm thấy tài khoản!' },
        HttpStatus.UNAUTHORIZED,
      );
    }

    // 2. CHẶN TÀI KHOẢN KHÔNG CÓ MẬT KHẨU (Tài khoản Google/Facebook)
    if (!foundUser.password) {
      throw new HttpException(
        {
          code: 400,
          errors: 'Tài khoản này đăng nhập bằng mạng xã hội, không thể đổi mật khẩu theo cách này!',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    // 2. CHECK MẬT KHẨU CŨ
    const isMatch = await passwordCompare(currentPassword, foundUser.password);
    if (!isMatch) {
      throw new HttpException(
        {
          code: 400, // Bạn có thể định nghĩa thêm mã INVALID_CURRENT_PASSWORD
          errors: 'Mật khẩu hiện tại không chính xác!',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    // 3. (Tùy chọn) CHECK MẬT KHẨU MỚI KHÔNG ĐƯỢC TRÙNG MẬT KHẨU CŨ
    const isSamePassword = await passwordCompare(newPassword, foundUser.password);
    if (isSamePassword) {
      throw new HttpException(
        {
          code: 400,
          errors: 'Mật khẩu mới không được trùng với mật khẩu cũ!',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    // 4. Băm mật khẩu mới và lưu DB
    const newPasswordHashed = await passwordHashing(newPassword);

    const result = await this.userModel.updateOne(
      { _id: user._id },
      {
        password: newPasswordHashed,
        tokenVersion: (foundUser.tokenVersion || 0) + 1,
      },
    );

    return result.matchedCount === 1;
  }

  // use for Account
  async fetchUserListToSignRole(getUserListToSignRoleDto: GetUserListToSignRoleDto) {
    try {
      const { page = 1, limit = 10, search } = getUserListToSignRoleDto;
      const skip = (page - 1) * limit;
      const userSearchMatch = search
        ? {
            $or: [
              { firstName: { $regex: search, $options: 'i' } },
              { email: { $regex: search, $options: 'i' } },
              { username: { $regex: search, $options: 'i' } },
            ],
          }
        : {};

      const pipeline = [
        { $match: userSearchMatch },
        {
          $lookup: {
            from: 'roles', // Tên collection của Role trong DB
            localField: 'role',
            foreignField: '_id',
            as: 'roleData',
          },
        },
        { $unwind: '$roleData' },
        { $match: { 'roleData.level': { $ne: 0 } } }, // Lọc bỏ level 0 ngay tại đây
        {
          $facet: {
            metadata: [{ $count: 'total' }],
            data: [
              { $skip: skip },
              { $limit: limit },
              {
                $project: {
                  _id: 1,
                  firstName: 1,
                  lastName: 1,
                  username: 1,
                  email: 1,
                  picture: '$picture.url',
                },
              },
            ],
          },
        },
      ];

      const result = await this.userModel.aggregate(pipeline);
      const total = result[0].metadata[0]?.total || 0;

      return {
        code: BusinessCode.USER_GET_SUCCESS,
        data: result[0].data,
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
          code: BusinessCode.INTERNAL_SERVER_ERROR,
          errors: ResponseMessage[BusinessCode.INTERNAL_SERVER_ERROR],
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async signRoleToUser(id: string, dto: any) {
    try {
      const { userIds } = dto;

      // Check valid role id
      validateMongoId(id);

      // Check valid user ids
      userIds.forEach((userId) => validateMongoId(userId));

      // Check exist role
      const role = await findModuleOrThrow(
        this.roleModel,
        '_id',
        id,
        BusinessCode.ROLE_NOT_FOUND,
        ResponseMessage[BusinessCode.ROLE_NOT_FOUND],
        HttpStatus.NOT_FOUND,
      );

      const result = await this.userModel.updateMany({ _id: { $in: userIds } }, { role: role._id });

      return {
        code: BusinessCode.USER_SIGNED_ROLE_SUCCESS,
        data: {
          updatedCount: result.modifiedCount,
        },
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
}
