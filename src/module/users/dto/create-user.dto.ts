import { IsEmail, IsNotEmpty } from 'class-validator'
export class CreateUserDto {
  @IsNotEmpty({ message: 'Tên không được để trống' })
  name: string // Tên

  @IsEmail({}, { message: 'Email không hợp lệ' })
  @IsNotEmpty({ message: 'Email không được để trống' })
  email: string // Email

  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  password: string // Mật khẩu
}
