import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectModel } from '@nestjs/mongoose'
import { User } from './schemas/user.schemas'
import { Model } from 'mongoose'
import { comparePasswordHelper, hashPasswordHelper } from 'src/helpers/utils'
import aqp from 'api-query-params'
import { DeleteUserDto } from './dto/delete-user.dto'
import { ChangePasswordDto, CreateAuthDto } from '@/auth/dto/create-auth.dto'
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
    await this.sentEmailVerify(email, code_verify)
    return {
      id: user._id,
    }
  }
  async sentEmailVerify(email: string, code_verify: string) {
    await this.mailerService.sendMail({
      to: email,
      from: 'noreply@nestjs.com',
      subject: 'Xác thực tài khoản',
      template: 'template_verify',
      context: {
        name: email,
        activationCode: code_verify,
      },
    })
  }
  async resentCodeVerify(id: string) {
    const user = await this.userModel.findOne({ _id: id })
    if (!user) {
      throw new BadRequestException('Tài khoản không tồn tại')
    } else if (user.status) {
      throw new BadRequestException('Tài khoản đã được kích hoạt')
    }
    const code_verify = uuidv4()
    await this.userModel.updateOne(
      { email: user.email },
      {
        code_verify: code_verify,
        code_verify_expires: dayjs().add(5, 'minutes').toDate(),
      },
    )
    await this.sentEmailVerify(user.email, code_verify)
    return {
      id: user._id,
    }
  }
  async checkCodeVerify(id: string, code: string) {
    const user = await this.userModel.findOne({ _id: id })
    if (!user) {
      throw new BadRequestException('Tài khoản không tồn tại')
    } else if (user.status) {
      throw new BadRequestException('Tài khoản đã được kích hoạt')
    }
    const checkTime = dayjs().isBefore(user.code_verify_expires)
    if (!checkTime) {
      throw new BadRequestException('Mã xác thực đã hết hạn')
    } else if (user.code_verify !== code) {
      throw new BadRequestException('Mã xác thực không chính xác')
    }
    await this.userModel.updateOne({ _id: id }, { status: true })
    return {
      id: user._id,
    }
  }
  async changePassword(changePasswordDto: ChangePasswordDto) {
    const user = await this.userModel.findOne({ _id: changePasswordDto.id })
    if (!user) {
      throw new BadRequestException('Tài khoản không tồn tại')
    }
    const checkPassword = await comparePasswordHelper(
      changePasswordDto.password,
      user?.password,
    )
    if (!checkPassword) {
      throw new BadRequestException('Mật khẩu Hiện tại không chính xác')
    }

    const checkTime = dayjs().isBefore(user.code_verify_expires)
    if (!checkTime) {
      throw new BadRequestException('Mã xác thực đã hết hạn')
    }
    await this.userModel.updateOne(
      { _id: changePasswordDto.id },
      {
        password: await hashPasswordHelper(changePasswordDto.newPassword),
      },
    )
    return {
      id: user._id,
      email: user.email,
    }
  }
}
