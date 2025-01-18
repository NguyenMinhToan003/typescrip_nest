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

  @Prop({ default: 'local' })
  accout_type: string // Loại tài khoản ("local", "google", "facebook")

  @Prop()
  code_verify: string // Mã xác thực

  @Prop({ default: Date.now() })
  code_verify_expires: Date // Hết hạn mã xác thực

  @Prop({ default: false })
  status: boolean // Trạng thái tài khoản (true: đã xác thực, false: chưa xác thực)

  @Prop({
    default:
      'https://yt3.ggpht.com/mKlZ7TlYPI2iivAuS5T1a2xfjPU_0kfSSmQG7b35Kg2F5XmEG35WLFYjz_-CPGHo1X_hkEMHSQ=s88-c-k-c0x00ffffff-no-rj',
  })
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
