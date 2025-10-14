import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class PaginationQueryDto {
  @ApiProperty({ description: 'Trang hiện tại', required: false, default: 1 })
  @IsOptional()
  @IsInt({ message: 'Page phải là một số nguyên' })
  @Min(1, { message: 'Page phải lớn hơn hoặc bằng 1' })
  @Transform(({ value }) => parseInt(value, 10) || 1)
  page: number = 1;

  @ApiProperty({
    description: 'Số lượng bản ghi mỗi trang',
    required: false,
    default: 10,
  })
  @IsOptional()
  @IsInt({ message: 'Limit phải là một số nguyên' })
  @Min(1, { message: 'Limit phải lớn hơn hoặc bằng 1' })
  @Max(100, { message: 'Limit không được vượt quá 100' }) // Nên có giới hạn max
  @Transform(({ value }) => parseInt(value, 10) || 10)
  limit: number = 10;

  @ApiProperty({
    description: "Sắp xếp theo trường. Thêm '-' ở đầu để sắp xếp giảm dần (ví dụ: -createdAt)",
    required: false,
    default: 'createdAt',
  })
  @IsOptional()
  @IsString()
  sort?: string;

  @ApiProperty({
    description: "Lọc theo các trường. Định dạng: 'field1=value1&field2=value2'",
    required: false,
    example: 'module=Users',
  })
  @IsOptional()
  @IsString()
  filters?: string;

  @ApiProperty({
    description: "Chọn các trường cần lấy, cách nhau bởi dấu phẩy. Thêm '-' ở đầu để loại bỏ.",
    required: false,
    example: 'name,email,-password',
  })
  @IsOptional()
  @IsString()
  projections?: string;
}
