import { PaginationQueryDto } from '@common/modules/pagination/dto/pagination-query.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GetPermissionDto extends PaginationQueryDto {
  @ApiProperty({
    description: 'Từ khoá tìm kiếm theo apiPath, method hoặc module',
    required: false,
  })
  @IsOptional()
  @IsString()
  search?: string;
}
