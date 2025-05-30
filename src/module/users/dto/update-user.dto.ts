import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator'

export class UpdateUserDto {
  @IsNotEmpty({ message: 'Id không được để trống' })
  @IsMongoId({ message: 'Id không hợp lệ' })
  id: string

  @IsOptional()
  name: string
  @IsOptional()
  email: string
  @IsOptional()
  status: string
}
