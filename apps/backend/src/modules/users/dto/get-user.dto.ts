import { PickType } from '@nestjs/swagger';
import { PaginationQueryDto } from '@common/modules/pagination/dto/pagination-query.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GetUserListToSignRoleDto extends PickType(PaginationQueryDto, [
  'page',
  'limit',
  'projections',
  'populate',
] as const) {
  @ApiProperty({
    description: 'Từ khoá tìm kiếm theo tên, username, email',
    required: false,
  })
  @IsOptional()
  @IsString()
  search?: string;
}
