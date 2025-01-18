import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator'

export class DeleteUserDto {
  @IsNotEmpty({ message: 'Id không được để trống' })
  @IsMongoId({ message: 'Id không hợp lệ' })
  id: string
}
