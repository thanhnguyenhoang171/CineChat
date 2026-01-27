import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
  Query,
  UploadedFiles,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseStatus } from '@common/decorators/response_message.decorator';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { AvatarValidator } from '@common/validators/file.validator';
import { BusinessCode } from '@common/constants/business-code';

@ApiBearerAuth('jwt')
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ResponseStatus(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createNewUser(createUserDto);
  }

  // TODO: Handle get all users with pagination
  @Get()
  @ResponseStatus(HttpStatus.OK)
  findAll() {
    return this.usersService.findAllUsersWithPagination();
  }

  @Get(':username')
  @ResponseStatus(HttpStatus.OK)
  getUserByUsername(@Param('username') username: string) {
    return this.usersService.findUserByUsername(username);
  }

  @Patch(':id')
  @ResponseStatus(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUserById(id, updateUserDto);
  }

  // TODO: Handle remove an user
  @Delete(':id')
  @ResponseStatus(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.usersService.removeUserById(+id);
  }

  @Post('avatar')
  @UseInterceptors(FileInterceptor('file'))
  @ResponseStatus(HttpStatus.OK)
  uploadAvatar(
    @UploadedFile(AvatarValidator) file: Express.Multer.File,
    @Query('folder') folder: string,
  ) {
    const data = {
      url: file.path, // Link ảnh Cloudinary
      public_id: file.filename, // ID ảnh (dùng để xóa sau này)
      folder: folder, // Folder vừa lưu}
    };
    return {
      code: BusinessCode.UPLOAD_FILE_SUCCESS,
      data: data,
    };
  }

  @Post('avatars')
  @UseInterceptors(FilesInterceptor('files', 20))
  uploadAvatars(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Query('folder') folder: string,
  ) {
    console.log(files);
    const response = files.map((file) => ({
      url: file.path,
      public_id: file.filename,
      folder: folder,
    }));

    return {
      code: BusinessCode.UPLOAD_FILE_SUCCESS,
      data: response,
    };
  }
}
