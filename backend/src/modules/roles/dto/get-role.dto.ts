import { PaginationQueryDto } from '@common/modules/pagination/dto/pagination-query.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GetRoleDto extends PaginationQueryDto {
  @ApiProperty({
    description: 'Từ khoá tìm kiếm theo name và description',
    required: false,
  })
  @IsOptional()
  @IsString()
  search?: string;
}
