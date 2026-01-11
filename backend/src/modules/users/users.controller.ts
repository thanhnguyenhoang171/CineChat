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

  // @Post('upload-avatar/:id')
  // @JwtPublic()
  // @ResponseStatus(HttpStatus.CREATED)
  // @UseInterceptors(FileInterceptor('file'))
  // @ApiOperation({ summary: 'Upload User Avatar' })
  // uploadUserAvatar(
  //   @UploadedFile(new FileValidationPipe()) file: Express.Multer.File,
  //   @Param('id') id: string,
  // ) {
  //   return this.usersService.uploadUserAvatarById(id, file);
  //   // return null;
  // }

  @Post('upload-avatar')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@UploadedFile() file: Express.Multer.File, @Query('folder') folder: string) {
    //Files uploaded, variable 'file' will contain info about uploaded file
    console.log(file);
    const data = {
      url: file.path, // Link ảnh Cloudinary
      public_id: file.filename, // ID ảnh (dùng để xóa sau này)
      folder: folder, // Folder vừa lưu}
    };

    return {
      message: 'Upload successfully',
      data: data,
    };
  }

  // @Post('test-stream')
  // @UseInterceptors(FilesInterceptor('files', 5)) // 'files': tên field, 5: số lượng tối đa
  // uploadMultipleFiles(
  //   @UploadedFiles() files: Express.Multer.File[], // <--- Nhận về một MẢNG file
  //   @Query('folder') folder: string,
  // ) {
  //   // Nếu user không gửi file nào thì files là mảng rỗng []
  //   if (!files || files.length === 0) {
  //     return { message: 'No files uploaded' };
  //   }

  //   // Map mảng file sang mảng kết quả trả về
  //   const response = files.map((file) => ({
  //     url: file.path,
  //     public_id: file.filename,
  //     originalName: file.originalname,
  //     folder: folder,
  //   }));

  //   return {
  //     message: `Successfully uploaded ${files.length} files`,
  //     data: response,
  //   };
  // }
}
