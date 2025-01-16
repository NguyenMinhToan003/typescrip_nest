import { Module } from '@nestjs/common'
import { PlaylistsService } from './playlists.service'
import { PlaylistsController } from './playlists.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { PlaylistSchema } from './schemas/playlist.schemas'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Playlist', schema: PlaylistSchema }]),
  ],
  controllers: [PlaylistsController],
  providers: [PlaylistsService],
})
export class PlaylistsModule {}
