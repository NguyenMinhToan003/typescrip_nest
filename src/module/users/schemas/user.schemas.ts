import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'

export type UserDocument = HydratedDocument<User>

@Schema({ timestamps: true })
export class User {
  @Prop()
  name: string // Tên

  @Prop({ unique: true })
  email: string // Email

  @Prop()
  password: string // Mật khẩu

  @Prop({ default: 'user' })
  role: string // Vai trò ("admin", "user")

  @Prop({ default: 'unactive' })
  status: string // Trạng thái ("active", "unactive")

  @Prop()
  avatar_url: string // URL ảnh đại diện

  @Prop({ type: [Types.ObjectId], ref: 'Movie' })
  watchlist: Types.ObjectId[] // Danh sách phim yeu thích

  @Prop({
    type: [
      {
        movie_id: Types.ObjectId,
        watched_at: Date,
        duration: Number,
      },
    ],
  })
  history: {
    movie_id: Types.ObjectId
    watched_at: Date
    duration: number
  }[] // Lịch sử xem phim
}
export const UserSchema = SchemaFactory.createForClass(User)
