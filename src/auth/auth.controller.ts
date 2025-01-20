import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './passport/local-auth.guard'
import { JwtAuthGuard } from './passport/jwt-auth.guard'
import { Public } from '@/decorator/customize'
import { CreateAuthDto } from './dto/create-auth.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // su dung chien luoc local
  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user)
  }
  @UseGuards(LocalAuthGuard)
  @Post('logout')
  async logout(@Request() req) {
    return req.logout()
  }

  @Post('register')
  @Public()
  async register(@Body() registertDto: CreateAuthDto) {
    return this.authService.handlerRegister(registertDto)
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user
  }
}
