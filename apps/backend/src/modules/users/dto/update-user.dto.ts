import { PickType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto extends PickType(CreateUserDto, ['firstName', 'lastName'] as const) {}

export class UpdateFullNameDto {
  @IsNotEmpty({ message: 'First name không được để trống' })
  @IsString()
  firstName: string; // Bỏ dấu ? đi để bắt buộc

  @IsNotEmpty({ message: 'Last name không được để trống' })
  @IsString()
  lastName: string; // Bỏ dấu ? đi để bắt buộc
}
