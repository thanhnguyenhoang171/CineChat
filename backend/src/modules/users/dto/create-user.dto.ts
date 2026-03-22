import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsBoolean,
  IsDateString,
  IsObject,
} from 'class-validator';
import { Gender, LoginProvider } from '@common/constants/common-constant';

export class CreateUserDto {
  @ApiProperty({
    example: LoginProvider.USERNAME,
    description: 'Phương thức đăng nhập',
    enum: LoginProvider,
  })
  @IsEnum(LoginProvider)
  @IsNotEmpty()
  provider: LoginProvider;

  @ApiProperty({ example: 'Nguyễn', description: 'Họ' })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiProperty({ example: 'Thanh', description: 'Tên' })
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiProperty({ example: '1995-10-17', description: 'Ngày sinh' })
  @IsDateString()
  @IsOptional()
  dateOfBirth?: string;

  @ApiProperty({ example: '0987654321', description: 'Số điện thoại' })
  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty({ example: 'Yêu phim ảnh', description: 'Tiểu sử' })
  @IsString()
  @IsOptional()
  bio?: string;

  @ApiProperty({
    example: Gender.MALE,
    description: 'Giới tính',
    enum: Gender,
  })
  @IsEnum(Gender)
  @IsOptional()
  gender?: Gender;

  @ApiProperty({ example: 'thanh171', description: 'Tên đăng nhập' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'Password123!', description: 'Mật khẩu' })
  @IsString()
  @IsOptional() // Password may be optional if provider is Google
  password?: string;

  @ApiProperty({ example: 'thanh@example.com', description: 'Email' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '652e456bf12a3c2b8c71e9f1', description: 'ID của Role' })
  @IsString()
  @IsNotEmpty()
  role: string;
}

export class RegisterAccountDto {
  @ApiProperty({ example: 'thanh171', description: 'Tên đăng nhập' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: Gender.MALE,
    description: 'Giới tính',
    enum: Gender,
  })
  @IsEnum(Gender)
  @IsOptional()
  gender?: Gender;

  @ApiProperty({ example: '1995-10-17', description: 'Ngày sinh' })
  @IsDateString()
  @IsOptional()
  dateOfBirth?: string;

  @ApiProperty({ example: '0987654321', description: 'Số điện thoại' })
  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty({
    example: LoginProvider.USERNAME,
    description: 'Phương thức đăng nhập',
    enum: LoginProvider,
  })
  @IsEnum(LoginProvider)
  @IsNotEmpty()
  provider: LoginProvider;

  @ApiProperty({ example: 'Password123!', description: 'Mật khẩu' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'Thanh', description: 'Tên' })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiProperty({ example: 'Nguyễn', description: 'Họ' })
  @IsString()
  @IsOptional()
  lastName?: string;
}

export class RegisterGGAccountDto {
  @ApiProperty({ example: 'Thanh', description: 'Tên' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Nguyễn', description: 'Họ' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ description: 'Ảnh đại diện từ Google' })
  @IsOptional()
  picture?: {
    url: string;
    publicId: string;
    folder: string;
  };

  @ApiProperty({ example: 'thanh@gmail.com', description: 'Email từ Google' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: LoginProvider.USERNAME,
    description: 'Phương thức đăng nhập',
    enum: LoginProvider,
  })
  @IsEnum(LoginProvider)
  @IsNotEmpty()
  provider: LoginProvider;
  
  @ApiProperty({ example: '105794109591295563703', description: 'Google ID' })
  @IsString()
  @IsNotEmpty()
  googleId: string;

  @ApiProperty({ example: true, description: 'Email đã xác thực' })
  @IsBoolean()
  @IsOptional()
  emailVerified?: boolean;
}

export class LoginAccountDto {
  @ApiProperty({ example: 'thanh171', description: 'Tên đăng nhập' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'ABC123', description: 'Mật khẩu' })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class SignRoleToUserDto {
  @ApiProperty({
    example: ['652e456bf12a3c2b8c71e9f1'],
    description: 'Danh sách ID user cần gán quyền',
  })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  userIds: string[];
}
