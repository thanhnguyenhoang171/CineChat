import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class CreateUserDto {
  @IsString({ message: 'Tên phải là một chuỗi' })
  @IsNotEmpty({ message: 'Tên không được để trống' })
  firstName: string;
  @IsString({ message: 'Họ phải là một chuỗi' })
  @IsNotEmpty({ message: 'Họ không được để trống' })
  lastName: string;

  @IsOptional()
  picture: string;

  @IsString({ message: 'Tên đăng nhập phải là một chuỗi' })
  @IsNotEmpty({ message: 'Tên đăng nhập không được để trống' })
  username: string;

  @IsString({ message: 'Mật khẩu phải là một chuỗi' })
  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  password: string;

  @IsEmail()
  @IsOptional()
  email: string;
}

export class RegisterAccountDto {
  @IsString({ message: 'Tên phải là một chuỗi' })
  @IsNotEmpty({ message: 'Tên không được để trống' })
  firstName: string;
  @IsString({ message: 'Họ phải là một chuỗi' })
  @IsNotEmpty({ message: 'Họ không được để trống' })
  lastName: string;

  @IsOptional()
  picture: string;

  @IsString({ message: 'Tên đăng nhập phải là một chuỗi' })
  @IsNotEmpty({ message: 'Tên đăng nhập không được để trống' })
  username: string;

  @IsString({ message: 'Mật khẩu phải là một chuỗi' })
  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  password: string;
}
