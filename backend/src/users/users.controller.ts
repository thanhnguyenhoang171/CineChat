import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseMessage } from 'src/decorators/response_message.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // only super admin can create user
  @Post()
  @ResponseMessage('Tạo người dùng thành công')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ResponseMessage('Lấy tất cả người dùng có phân trang thành công')
  findAll() {
    throw new HttpException('Không tìm thấy người dùng', HttpStatus.NOT_FOUND);
  }

  @Get(':username')
  @ResponseMessage('Lấy thông tin người dùng thành công')
  getUserByUsername(@Param('username') username: string) {
    return this.usersService.findUserByUsername(username);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
