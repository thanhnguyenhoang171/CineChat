import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { LoginProvider } from '@common/constants/common-constant';

export class CreateUserDto {
  @ApiProperty({
    example: LoginProvider.USERNAME,
    description: 'Provider đăng nhập',
    enum: LoginProvider,
  })
  @IsEnum(LoginProvider, {
    message: 'Provider phải là một trong các giá trị: USERNAME(0), GOOGLE(1)',
  })
  @IsNotEmpty({ message: 'Provider không được để trống' })
  provider: LoginProvider;

  @ApiProperty({ example: 'thanhnguyen', description: 'Tên' })
  @IsString({ message: 'Tên phải là một chuỗi' })
  @IsOptional()
  firstName: string;

  @ApiProperty({ example: 'thanhnguyen', description: 'Tên' })
  @IsString({ message: 'Họ phải là một chuỗi' })
  @IsOptional()
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
  @ApiProperty({
    example: LoginProvider.USERNAME,
    description: 'Provider đăng nhập',
    enum: LoginProvider,
  })
  @IsEnum(LoginProvider, {
    message: 'Provider phải là một trong các giá trị: USERNAME(0), GOOGLE(1)',
  })
  @IsNotEmpty({ message: 'Provider không được để trống' })
  @IsOptional()
  provider: LoginProvider = LoginProvider.USERNAME;

  @ApiProperty({ example: 'thanhnguyen', description: 'Tên' })
  @IsString({ message: 'Tên phải là một chuỗi' })
  @IsOptional()
  firstName: string;

  @ApiProperty({ example: 'thanhnguyen', description: 'Tên' })
  @IsString({ message: 'Họ phải là một chuỗi' })
  @IsOptional()
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

export class RegisterGGAccountDto {
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
  picture: {
    url: string;
    public_id: string;
    folder: string;
  };

  @ApiProperty({ example: 'thanhnguyen@gmail.com', description: 'Email' })
  @IsOptional()
  email: string;

  @ApiProperty({
    example: LoginProvider.USERNAME,
    description: 'Provider đăng nhập',
    enum: LoginProvider,
  })
  @IsEnum(LoginProvider, {
    message: 'Provider phải là một trong các giá trị: USERNAME(0), GOOGLE(1)',
  })
  @IsNotEmpty({ message: 'Provider không được để trống' })
  @IsOptional()
  provider: LoginProvider = LoginProvider.GOOGLE;

  @ApiProperty({ example: 'am2n34nsfjdkdm', description: 'Google Id khi đăng ký thành công' })
  @IsOptional()
  googleId: string;

  @ApiProperty({ example: 'true/false', description: 'Email đã xác thực hay chưa' })
  @IsOptional()
  emailVerified: boolean;
}

export class LoginAccountDto {
  @ApiProperty({ example: 'thanh171', description: 'Tên đăng nhập' })
  @IsString({ message: 'Tên đăng nhập phải là một chuỗi' })
  @IsNotEmpty({ message: 'Tên đăng nhập không được để trống' })
  username: string;

  @ApiProperty({ example: 'ABC123', description: 'Mật khẩu' })
  @IsString({ message: 'Mật khẩu phải là một chuỗi' })
  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  password: string;
}
