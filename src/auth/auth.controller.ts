import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './passport/local-auth.guard'
import { JwtAuthGuard } from './passport/jwt-auth.guard'
import { Public } from '@/decorator/customize'
import { CreateAuthDto } from './dto/create-auth.dto'
import { MailerService } from '@nestjs-modules/mailer'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

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

  // @Post('mail')
  // @Public()
  // async sendMail() {
  //   try {
  //     const result = await this.mailerService.sendMail({
  //       to: 'nguyentoan04.0003@gmail.com', // list of receivers
  //       from: 'noreply@nestjs.com', // sender address
  //       subject: 'Testing Nest MailerModule ✔', // Subject line
  //       text: 'Welcome', // plaintext body
  //       template: 'template_verify',
  //       context: {
  //         name: 'Toan',
  //         activationCode: '12345678',
  //       },
  //     })
  //     return { success: true, message: 'Email sent successfully', result }
  //   } catch (error) {
  //     return { success: false, message: 'Failed to send email', error }
  //   }
  // }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user
  }
}
