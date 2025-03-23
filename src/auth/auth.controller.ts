import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './passport/local-auth.guard'
import { Public, ResponseMessage } from '@/decorator/customize'
import {
  ChangePasswordDto,
  CheckCodeVerifyDto,
  CreateAuthDto,
} from './dto/create-auth.dto'
import { GoogleOAuthGuard } from './passport/google-oauth.guard'


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // su dung chien luoc local
  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('login')
  @ResponseMessage('Đăng nhập thành công')
  @HttpCode(HttpStatus.OK)
  async login(@Request() req) {
    if (req.user.status === false) {
      throw new UnprocessableEntityException({
        message: 'Tài khoản chưa được kích hoạt',
        data: req.user.id,
      })
    }
    return this.authService.login(req.user)
  }

  @Post('register')
  @Public()
  @ResponseMessage('Đăng ký thành công')
  async register(@Body() registertDto: CreateAuthDto) {
    return this.authService.handlerRegister(registertDto)
  }

  @Post('resent-code-verify')
  @Public()
  @ResponseMessage('Mã xác nhận đã được gửi')
  @HttpCode(HttpStatus.OK)
  async resentCodeVerify(@Body('id') id: string) {
    return await this.authService.resentCodeVerify(id)
  }

  @Post('check-code-verify')
  @Public()
  @ResponseMessage('Tài khoản đã được kích hoạt')
  @HttpCode(HttpStatus.OK)
  async checkCodeVerify(@Body() checkCodeVerifyDto: CheckCodeVerifyDto) {
    return await this.authService.checkCodeVerify(
      checkCodeVerifyDto.id,
      checkCodeVerifyDto.code_verify,
    )
  }

  @Post('change-password')
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Đổi mật khẩu thành công')
  async changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    return await this.authService.changePassword(changePasswordDto)
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user
  }

  @Public()
  @Get('/google')
  @UseGuards(GoogleOAuthGuard)
  async googleAuth(@Request() req) {}

  @Public()
  @Get('google-redirect')
  @UseGuards(GoogleOAuthGuard)
  googleAuthRedirect(@Request() req) {
    return this.authService.googleLogin(req)
  }
}
