import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto, RegisterAccountDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as SoftDeleteMongoosePlugin from 'soft-delete-plugin-mongoose';
import { passwordHashing } from 'src/utils/passwordBcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: SoftDeleteMongoosePlugin.SoftDeleteModel<UserDocument>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findUserByUsername(username: string) {
    return this.userModel.findOne({ username });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async registerAccount(registerAccountDto: RegisterAccountDto) {
    try {
      const { firstName, lastName, picture, username, password } =
        registerAccountDto;
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
