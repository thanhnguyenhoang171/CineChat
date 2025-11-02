import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import RolesService from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { User } from '@common/decorators/user.decorator';
import type { IUser } from '@interfaces/user.interface';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseStatus } from '@common/decorators/response_message.decorator';
import { HttpStatusCode } from '@common/constants/http-status-code';
import { GetRoleDto } from '@modules/roles/dto/get-role.dto';
import { JwtPublic } from '@common/decorators/jwt_public.decorator';

@Controller('roles')
@ApiBearerAuth('jwt')
@ApiTags('Roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new role' })
  @ResponseStatus(HttpStatusCode.CREATED)
  createRoleController(@Body() createRoleDto: CreateRoleDto, @User() user: IUser) {
    console.log(createRoleDto);
    return this.rolesService.createRole(createRoleDto, user);
  }

  @Get()
  @JwtPublic()
  @ApiOperation({ summary: 'Get all roles with pagination' })
  @ResponseStatus(HttpStatusCode.OK)
  findAll(@Query() getRoleDto: GetRoleDto) {
    return this.rolesService.findAllRoleWithPagination(getRoleDto);
  }

  @Get(':id')
  @ApiOperation({summary: 'Get a role with id of the role' })
  @ResponseStatus(HttpStatusCode.OK)
  findOne(@Param('id') _id: string) {
    return this.rolesService.findRoleById(_id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id);
  }
}
