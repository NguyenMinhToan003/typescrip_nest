import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Post,
  Request,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './passport/local-auth.guard'
import { Public } from '@/decorator/customize'
import { CreateAuthDto } from './dto/create-auth.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // su dung chien luoc local
  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Request() req) {
    if (req.user.status === false) {
      throw new UnprocessableEntityException('Tài khoản chưa được kích hoạt')
    }
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
