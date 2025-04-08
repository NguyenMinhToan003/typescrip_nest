import { NestFactory, Reflector } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { ValidationPipe } from '@nestjs/common'
import { ExceptionInterceptor, ResponseInterceptor } from './core/interceptor'
import session from 'express-session'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)
  const port = configService.get<number>('PORT_BACKEND')
  // Cấu hình CORS
  app.enableCors({
    origin: [configService.get<string>('ADD_FRONTEND')], // URL của ứng dụng Next.js
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Cho phép gửi cookie hoặc header xác thực
  })
  // Cấu hình ValidationPipe toàn cục
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  )
  app.use(
    session({
      secret: 'toan-1-2-3',
      resave: false,
      saveUninitialized: false,
    }),
  )
  // Thêm interceptor xử lý lỗi toàn cục
  const reflector = app.get(Reflector)
  app.useGlobalInterceptors(
    new ResponseInterceptor(reflector),
    new ExceptionInterceptor(reflector),
  )
  // Cấu hình global prefix
  app.setGlobalPrefix('api/v1', { exclude: [''] })
  // setup socket io
  const server = app.getHttpServer()
  await app.listen(port)
}
bootstrap()
