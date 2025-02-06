import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)
  const port = configService.get<number>('PORT_BACKEND')
  app.enableCors({
    origin: [configService.get<string>('ADD_FRONTEND')], // URL của ứng dụng Next.js
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Cho phép gửi cookie hoặc header xác thực
  })
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  )
  app.setGlobalPrefix('api/v1', { exclude: [''] })
  await app.listen(port)
}
bootstrap()
