import { Injectable } from '@nestjs/common'
import { UsersService } from '@/module/users/users.service'
import { JwtService } from '@nestjs/jwt'
import { comparePasswordHelper } from '@/helpers/utils'
import { ChangePasswordDto } from './dto/create-auth.dto'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email)
    if (!user) return null
    const isValidPassword = await comparePasswordHelper(pass, user?.password)
    if (!isValidPassword) return null
    return user
  }
  async login(user: any) {
    const payload = { data: user, sub: user._id }
    return {
      user: {
        email: user.email,
        name: user.name,
        role: user.role,
        id: user._id,
      },
      accessToken: await this.jwtService.signAsync(payload),
    }
  }

  async handlerRegister(registertDto: any) {
    const user = await this.usersService.register(registertDto)
    if (user) {
      return {
        id: user.id,
      }
    }
  }
  async resentCodeVerify(id: string) {
    const user = await this.usersService.resentCodeVerify(id)
    return {
      id: user.id,
    }
  }
  async checkCodeVerify(id: string, code_verify: string) {
    const user = await this.usersService.checkCodeVerify(id, code_verify)
    return {
      id: user.id,
    }
  }
  async changePassword(changePasswordDto: ChangePasswordDto) {
    const user = await this.usersService.changePassword(changePasswordDto)
    return {
      id: user.id,
    }
  }
}
