import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common'
import { UsersService } from '@/module/users/users.service'
import { JwtService } from '@nestjs/jwt'
import { comparePasswordHelper } from '@/helpers/utils'

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
      data: {
        email: user.email,
        name: user.name,
        role: user.role,
        id: user._id,
      },
      statusCode: HttpStatus.OK,
      access_token: await this.jwtService.signAsync(payload),
    }
  }

  async handlerRegister(registertDto: any) {
    const user = await this.usersService.register(registertDto)
    if (user) {
      return {
        message: 'Hãy kiểm tra email để xác nhận tài khoản',
        success: true,
        action: 'verify',
        user_id: user.id,
      }
    }
  }
}
