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
import { ensureModuleExists, validateMongoId } from '@common/utils/validateUtil';
import { passwordHashing } from '@common/utils/passwordBcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: SoftDeleteMongoosePlugin.SoftDeleteModel<UserDocument>,
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
    return {
      code: BusinessCode.SUCCESS,
      data: await this.userModel.findOne({ username }).lean(),
    };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    validateMongoId(id);
    const user = await ensureModuleExists(
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
      // Kiểm tra tránh trùng username
      const duplicatedUsername = await this.userModel.findOne({
        username,
      });
      if (duplicatedUsername) {
        throw new HttpException('Username này đã tồn tại', HttpStatus.CONFLICT);
      }
      // Hash password
      const passwordHashed = await passwordHashing(password);

      // Tạo mới acc
      const result = await this.userModel.create({
        firstName,
        lastName,
        picture,
        username,
        password: passwordHashed,
        role: 'user', // hardcode role
      });

      return result.id.toString();
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Lỗi hệ thống, vui lòng thử lại sau',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
