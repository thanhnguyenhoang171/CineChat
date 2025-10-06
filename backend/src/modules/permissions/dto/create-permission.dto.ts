import { HttpMethod } from "@common/constants/http-method.enum";
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreatePermissionDto {
    @ApiProperty({ example: 'Create User', description: 'Tên quyền' })
    @IsString({ message: 'Tên quyền phải là một chuỗi' })
    @IsNotEmpty({ message: 'Tên quyền không được để trống' })
    name: string;

    @ApiProperty({ example: '/users', description: 'Đường dẫn API' })
    @IsString({ message: 'Đường dẫn API phải là một chuỗi' })
    @IsNotEmpty({ message: 'Đường dẫn API không được để trống' })
    apiPath: string;

    @ApiProperty({ example: 'POST', description: 'Phương thức HTTP' })
    @IsEnum(HttpMethod, {message: `Phương thức HTTP phải là một trong các giá trị sau: ${Object.values(HttpMethod).join(', ')}`})
    @IsNotEmpty({ message: 'Phương thức HTTP không được để trống' })
    method: string;

    @ApiProperty({ example: 'Module A', description: 'Module' })
    @IsString({ message: 'Module phải là một chuỗi' })
    @IsNotEmpty({ message: 'Module không được để trống' })
    @ApiProperty({ example: 'User Management', description: 'Module' })
    module: string;
}
