import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './module/users/users.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { MoviesModule } from './module/movies/movies.module'
import { CategoriesModule } from './module/categories/categories.module'
import { ReviewsModule } from './module/reviews/reviews.module'
import { PlaylistsModule } from './module/playlists/playlists.module'
import { BannersModule } from './module/banners/banners.module'
import { TagsModule } from './module/tags/tags.module'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [
    UsersModule,
    MoviesModule,
    CategoriesModule,
    ReviewsModule,
    PlaylistsModule,
    BannersModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    TagsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
