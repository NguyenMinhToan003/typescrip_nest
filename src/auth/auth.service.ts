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

  async signIn(email: string, pass: string) {
    try {
      const user = await this.usersService.findOneByEmail(email)
      const isValidPassword = await comparePasswordHelper(pass, user?.password)
      if (!isValidPassword) {
        throw new UnauthorizedException('email / password khong hop le')
      }
      const payload = { sub: user.userId, username: user.username }
      return {
        access_token: await this.jwtService.signAsync(payload),
      }
    } catch (error) {
      throw new UnauthorizedException('email / password khong hop le')
    }
  }
}
