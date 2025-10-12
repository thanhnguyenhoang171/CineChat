import { HttpMethod } from '@common/constants/http-method.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { Min, IsInt, Max, IsOptional, IsString } from 'class-validator';

export class GetPermissionDto {
  @ApiProperty({ description: 'Trang hiện tại', default: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform(({ value }) => (value ? parseInt(value, 10) : 1)) // need to parse to int because query params are string
  page: number = 1;

  @ApiProperty({ description: 'Số lượng bảng ghi mỗi trang', default: 10 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  @Transform(({ value }) => (value ? parseInt(value, 10) : 10))
  limit: number = 10;

  @ApiProperty({
    description: 'Từ khoá tìm kiếm theo apiPath, method hoặc module',
    required: false,
    default: 'permissions',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({
    description: 'Bộ lọc nâng cao theo field',
    required: false,
    default: 'method=GET&module=Module Permissions',
  })
  @IsOptional()
  filters?: string;

  @ApiProperty({ description: 'Sắp xếp theo field', required: false, default: 'createdAt' })
  @IsOptional()
  @IsString()
  sort?: string;

  @ApiProperty({
    description: 'Chọn field cần lấy',
    required: false,
    default: 'method,module',
  })
  @IsOptional()
  @IsString()
  projections?: string;
}
