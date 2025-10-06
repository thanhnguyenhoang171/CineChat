import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class CreateUserDto {
  @ApiProperty({ example: 'thanhnguyen', description: 'Tên' })
  @IsString({ message: 'Tên phải là một chuỗi' })
  @IsNotEmpty({ message: 'Tên không được để trống' })
  firstName: string;

  @ApiProperty({ example: 'thanhnguyen', description: 'Tên' })
  @IsString({ message: 'Họ phải là một chuỗi' })
  @IsNotEmpty({ message: 'Họ không được để trống' })
  lastName: string;

  @ApiProperty({ example: 'thanhnguyen', description: 'Tên' })
  @IsOptional()
  picture: string;

  @ApiProperty({ example: 'thanhnguyen', description: 'Tên' })
  @IsString({ message: 'Tên đăng nhập phải là một chuỗi' })
  @IsNotEmpty({ message: 'Tên đăng nhập không được để trống' })
  username: string;

  @ApiProperty({ example: 'thanhnguyen', description: 'Tên' })
  @IsString({ message: 'Mật khẩu phải là một chuỗi' })
  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  password: string;

  @ApiProperty({ example: 'thanhnguyen', description: 'Tên' })
  @IsEmail()
  @IsOptional()
  email: string;
}

export class RegisterAccountDto {
  @ApiProperty({ example: 'thanhnguyen', description: 'Tên' })
  @IsString({ message: 'Tên phải là một chuỗi' })
  @IsNotEmpty({ message: 'Tên không được để trống' })
  firstName: string;

  @ApiProperty({ example: 'thanhnguyen', description: 'Tên' })
  @IsString({ message: 'Họ phải là một chuỗi' })
  @IsNotEmpty({ message: 'Họ không được để trống' })
  lastName: string;

  @ApiProperty({ example: 'thanhnguyen', description: 'Tên' })
  @IsOptional()
  picture: string;

  @ApiProperty({ example: 'thanhnguyen', description: 'Tên' })
  @IsString({ message: 'Tên đăng nhập phải là một chuỗi' })
  @IsNotEmpty({ message: 'Tên đăng nhập không được để trống' })
  username: string;

  @ApiProperty({ example: 'thanhnguyen', description: 'Tên' })
  @IsString({ message: 'Mật khẩu phải là một chuỗi' })
  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  password: string;
}

export class LoginAccountDto {
  @ApiProperty({ example: 'thanhnguyen', description: 'Tên đăng nhập' })
  @IsString({ message: 'Tên đăng nhập phải là một chuỗi' })
  @IsNotEmpty({ message: 'Tên đăng nhập không được để trống' })
  username: string;

  @ApiProperty({ example: '123456', description: 'Mật khẩu' })
  @IsString({ message: 'Mật khẩu phải là một chuỗi' })
  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  password: string;
}
