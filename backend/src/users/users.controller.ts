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
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseStatus } from 'src/decorators/response_message.decorator';
import { HttpStatusCode } from 'src/types/http-status/http-status-code';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ResponseStatus(HttpStatusCode.CREATED)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ResponseStatus(HttpStatusCode.OK)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':username')
  @ResponseStatus(HttpStatusCode.OK)
  getUserByUsername(@Param('username') username: string) {
    return this.usersService.findUserByUsername(username);
  }

  @Patch(':id')
  @ResponseStatus(HttpStatusCode.OK)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ResponseStatus(HttpStatusCode.OK)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
