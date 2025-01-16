import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'

export type PlaylistDocument = HydratedDocument<Playlist>

@Schema({ timestamps: true })
export class Playlist {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  user_id: Types.ObjectId // ID người dùng

  @Prop()
  name: string // Tên

  @Prop({ type: [Types.ObjectId], ref: 'Movie' })
  movies: Types.ObjectId[] // Danh sách phim
}
export const PlaylistSchema = SchemaFactory.createForClass(Playlist)
