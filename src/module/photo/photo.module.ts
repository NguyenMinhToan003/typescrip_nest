import { Module } from '@nestjs/common'
import { PhotoService } from './photo.service'
import { PhotoController } from './photo.controller'
import { DatabaseModule } from '@/database/database.module'
import { photoProviders } from './photo.providers'

@Module({
  imports: [DatabaseModule],
  controllers: [PhotoController],
  providers: [...photoProviders, PhotoService],
})
export class PhotoModule {}
