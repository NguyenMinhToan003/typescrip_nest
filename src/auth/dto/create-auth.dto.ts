import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator'

export class CreateAuthDto {
  @IsNotEmpty({ message: 'email khong duoc de trong' })
  email: string
  @IsNotEmpty({ message: 'password khong duoc de trong' })
  password: string

  @IsOptional()
  name: string
}

export class CheckCodeVerifyDto {
  @IsNotEmpty({ message: 'code verify khong duoc de trong' })
  code_verify: string
  @IsNotEmpty({ message: 'id khong duoc de trong' })
  @IsMongoId({ message: 'Id không hợp lệ' })
  id: string
}
export class ChangePasswordDto {
  @IsNotEmpty({ message: 'code verify khong duoc de trong' })
  code_verify: string
  @IsNotEmpty({ message: 'id khong duoc de trong' })
  @IsMongoId({ message: 'Id không hợp lệ' })
  id: string
  @IsNotEmpty({ message: 'password cu khong duoc de trong' })
  password: string
  @IsNotEmpty({ message: 'password moi khong duoc de trong' })
  newPassword: string
}
