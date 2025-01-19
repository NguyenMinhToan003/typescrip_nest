import { BadRequestException, Injectable, Query } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectModel } from '@nestjs/mongoose'
import { User } from './schemas/user.schemas'
import { Model } from 'mongoose'
import { hashPasswordHelper } from 'src/helpers/utils'
import aqp from 'api-query-params'
import { DeleteUserDto } from './dto/delete-user.dto'
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  checkEmail = async (email: string) => {
    return (await this.userModel.findOne({ email })) ? true : false
  }
  async create(createUserDto: CreateUserDto) {
    const checkEmail = await this.checkEmail(createUserDto.email)
    if (checkEmail) {
      throw new BadRequestException('Email này đã tồn tại')
    }
    const hassPassword = await hashPasswordHelper(createUserDto.password)
    try {
      const user = await this.userModel.create({
        ...createUserDto,
        password: hassPassword,
      })
      return {
        message: 'Người dùng đã được tạo',
        user,
      }
    } catch (error) {
      return error
    }
  }

  async findAll(query: string, page: number) {
    try {
      page = Math.max(Number(page) || 1, 1)
      const { filter, limit = 5, sort } = aqp(query)
      // tach page ra khoi filter (do aqp lay page vao trong filter)
      if (filter.page) delete filter.page

      const skip = (page - 1) * limit
      const users = await this.userModel
        .find(filter)
        .skip(skip)
        .limit(limit)
        .sort(sort as any)

      const totalItems = await this.userModel.countDocuments(filter)
      const totalPage = totalItems > 0 ? Math.ceil(totalItems / limit) : 0
      return {
        totalPage,
        results: users,
      }
    } catch (error) {
      return error
    }
  }

  async findOneById(id: string) {
    const user = await this.userModel.findById(id)
    return user
  }
  async findOneByEmail(email: string) {
    return await this.userModel.findOne({ email })
  }
  async update(updateUserDto: UpdateUserDto) {
    return await this.userModel.updateOne(
      { _id: updateUserDto.id },
      {
        name: updateUserDto.name,
        email: updateUserDto.email,
        status: updateUserDto.status,
      },
    )
  }

  async remove(deleteUserDto: DeleteUserDto) {
    return await this.userModel.deleteOne({ _id: deleteUserDto.id })
  }
}
