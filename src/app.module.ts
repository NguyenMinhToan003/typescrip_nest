import { Module } from '@nestjs/common'
import { AppController } from '@/app.controller'
import { AppService } from '@/app.service'
import { UsersModule } from '@/module/users/users.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { MoviesModule } from '@/module/movies/movies.module'
import { CategoriesModule } from '@/module/categories/categories.module'
import { ReviewsModule } from '@/module/reviews/reviews.module'
import { PlaylistsModule } from '@/module/playlists/playlists.module'
import { BannersModule } from '@/module/banners/banners.module'
import { TagsModule } from '@/module/tags/tags.module'
import { AuthModule } from '@/auth/auth.module'
import { MailerModule } from '@nestjs-modules/mailer'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { BookModule } from './module/book/book.module'
import { MessagesModule } from './module/messages/messages.module'
import { PhotoModule } from './module/photo/photo.module'
import { CategoryModule } from './module/category/category.module'
import { guardProvier } from './Guard/guard.provider'
import { TableModule } from './module/table/table.module'
import { MulterModule } from '@nestjs/platform-express'

@Module({
  imports: [
    UsersModule,
    MoviesModule,
    CategoriesModule,
    ReviewsModule,
    PlaylistsModule,
    BannersModule,
    TagsModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('MAIL_HOST'),
          port: configService.get<number>('MAIL_PORT'),
          ignoreTLS: true,
          secure: true,
          auth: {
            user: configService.get<string>('MAIL_USER'),
            pass: configService.get<string>('MAIL_PASS'),
          },
        },
        defaults: {
          from: '"No Reply" <no-reply@localhost>',
        },
        preview: false,
        template: {
          dir: process.cwd() + '/src/mail/templates',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        dest: configService.get<string>('MULTER_DEST'),
      }),
      inject: [ConfigService],
    }),
    BookModule,
    MessagesModule,
    PhotoModule,
    CategoryModule,
    TableModule,
  ],
  controllers: [AppController],
  providers: [...guardProvier, AppService],
})
export class AppModule {}
