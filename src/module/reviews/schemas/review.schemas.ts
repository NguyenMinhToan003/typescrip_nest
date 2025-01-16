import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'

export type ReviewDocument = HydratedDocument<Review>

@Schema({ timestamps: true })
export class Review {
  @Prop({ type: Types.ObjectId, ref: 'Movie' })
  movie_id: Types.ObjectId // ID phim

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user_id: string // ID người dùng

  @Prop()
  rating: number // Đánh giá (từ 1 đến 5)

  @Prop()
  comment: string // Nội dung đánh giá
}
export const ReviewSchema = SchemaFactory.createForClass(Review)
