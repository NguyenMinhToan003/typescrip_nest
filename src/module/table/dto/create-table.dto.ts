import { IsString } from 'class-validator'

export class CreateTableDto {
  @IsString({ message: 'name must be a string' })
  name: string
}
