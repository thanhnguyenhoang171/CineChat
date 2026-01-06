import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';

export class CreateRoleDto {
  @ApiProperty({ description: 'Cấp vai trò', default: 3 })
  @IsNotEmpty({ message: 'Cấp vai trò không được để trống' })
  level: number;

  @ApiProperty({ description: 'Mô tả vai trò', default: 'Vai trò người dùng' })
  @IsNotEmpty({ message: 'Mô tả vai trò không được để trống' })
  description: string;

  @ApiProperty({ description: 'Trạng thái hoạt động của vai trò', default: true })
  @IsBoolean({ message: 'isActive phải là một giá trị boolean' })
  isActive: boolean;

  @ApiProperty({
    description: 'Các quyền được gán cho vai trò (mảng các ObjectId)',
    type: [String],
    example: ['652e456bf12a3c2b8c71e9f1', '652e456bf12a3c2b8c71e9f2'],
  })
  @IsArray({ message: 'permissions phải là một mảng' })
  permissions: mongoose.Schema.Types.ObjectId[];
}
