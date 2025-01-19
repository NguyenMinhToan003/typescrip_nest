import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthService } from '../auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    /* 
    mac dinh passport se tim username va password trong request body
    =>super()
    neu muon su dung email va password thi phai truyen vao object thi phai khai bao nhu ben duoi
    */
    super({ usernameField: 'email' })
  }
  // ham nay se duoc goi khi su dung @UseGuards(AuthGuard('local')) trong controller
  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password)
    if (!user) {
      throw new UnauthorizedException('email / password khong dung')
    }
    return user
  }
}
