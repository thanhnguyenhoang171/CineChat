import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpStatus,
} from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseStatus } from '@common/decorators/response_message.decorator';
import { User } from '@common/decorators/user.decorator';
import type { IUser } from '@interfaces/user.interface';
import { GetPermissionDto } from './dto/get-permission.dto';
import { JwtPublic } from '@common/decorators/auth.decorator';

@Controller('permissions')
@ApiBearerAuth('jwt')
@ApiTags('Permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  @ResponseStatus(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new permission' })
  createPermissionController(
    @Body() createPermissionDto: CreatePermissionDto,
    @User() user: IUser,
  ) {
    return this.permissionsService.createPermission(createPermissionDto, user);
  }

  @Get()
  @ApiOperation({ summary: 'Get permissions with pagination' })
  @ResponseStatus(HttpStatus.OK)
  getAllPermissionWithPaginationController(@Query() getPermissionDto: GetPermissionDto) {
    return this.permissionsService.findAllPermissionsWithPagination(getPermissionDto);
  }

  @Get(':id')
  @ResponseStatus(HttpStatus.OK)
  @ApiOperation({ summary: 'Get permission by id' })
  findPermissionByIdController(@Param('id') id: string) {
    return this.permissionsService.findPermissionById(id);
  }

  @Patch(':id')
  @ResponseStatus(HttpStatus.OK)
  @ApiOperation({ summary: 'Update permission by id' })
  updatePermissionByIdController(
    @Param('id') id: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
    @User() user: IUser,
  ) {
    return this.permissionsService.updatePermissionById(id, updatePermissionDto, user);
  }

  @Delete(':id')
  @ResponseStatus(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete permission by id' })
  removePermissionByIdController(@Param('id') id: string, @User() user: IUser) {
    return this.permissionsService.removePermissionById(id, user);
  }
}
