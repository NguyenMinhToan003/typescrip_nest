import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectModel } from '@nestjs/mongoose'
import { User } from './schemas/user.schemas'
import { Model } from 'mongoose'
import { hashPasswordHelper } from 'src/helpers/utils'
import aqp from 'api-query-params'
import { DeleteUserDto } from './dto/delete-user.dto'
import { CreateAuthDto } from '@/auth/dto/create-auth.dto'
import { v4 as uuidv4 } from 'uuid'
import dayjs from 'dayjs'
import { MailerService } from '@nestjs-modules/mailer'
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly mailerService: MailerService,
  ) {}
  checkEmail = async (email: string) => {
    return (await this.userModel.findOne({ email })) ? true : false
  }
  async create(createUserDto: CreateUserDto) {
    const checkEmail = await this.checkEmail(createUserDto.email)
    if (checkEmail) {
      throw new BadRequestException('Email này đã tồn tại')
    }
    const hassPassword = await hashPasswordHelper(createUserDto.password)

    const user = await this.userModel.create({
      ...createUserDto,
      password: hassPassword,
    })
    return {
      message: 'Người dùng đã được tạo',
      user,
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
  async register(registertDto: CreateAuthDto) {
    const { email, password, name } = registertDto
    const checkEmail = await this.checkEmail(email)
    if (checkEmail) {
      throw new BadRequestException('Email này đã tồn tại')
    }
    const hassPassword = await hashPasswordHelper(password)
    const code_verify = uuidv4()
    const user = await this.userModel.create({
      email,
      name,
      password: hassPassword,
      isActivated: false,
      code_verify: code_verify,
      code_verify_expires: dayjs().add(5, 'minutes').toDate(),
    })
    await this.mailerService.sendMail({
      to: 'nguyentoan04.0003@gmail.com', // list of receivers
      from: 'noreply@nestjs.com', // sender address
      subject: 'Testing Nest MailerModule ✔', // Subject line
      text: 'Welcome', // plaintext body
      template: 'template_verify',
      context: {
        name: user?.name || user?.email,
        activationCode: code_verify,
      },
    })
    return {
      message: 'Người dùng đã được tạo',
      user,
    }
  }
}
