import { Injectable, UnauthorizedException } from '@nestjs/common'
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
      access_token: await this.jwtService.signAsync(payload),
    }
  }
}
