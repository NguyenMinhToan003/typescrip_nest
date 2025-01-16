import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'

export type MovieDocument = HydratedDocument<Movie>

@Schema({ timestamps: true })
export class Movie {
  @Prop()
  title: string // Tiêu đề

  @Prop()
  slug: string // URL thân thiện

  @Prop()
  description: string // Mô tả

  @Prop()
  thumbnail_url: string // URL ảnh đại diện

  @Prop()
  video_url: string // URL video

  @Prop({ type: [String] })
  genres: string[] // Thể loại (e.g., "Action", "Comedy")

  @Prop({ type: [String] })
  cast: string[] // Diễn viên (e.g., "Tom Cruise", "Angelina Jolie")

  @Prop({ type: [String] })
  director: string[] // Đạo diễn (e.g., "Christopher Nolan", "James Cameron")

  @Prop()
  release_date: Date // Ngày phát hành

  @Prop()
  duration: number // Thời lượng (đơn vị: phút)

  @Prop()
  quality: string // Chất lượng (e.g., "HD", "Full HD")

  @Prop()
  views: number // Lượt xem

  @Prop()
  language: string // Ngôn ngữ (e.g., "English", "Vietnamese")
}
export const MovieSchema = SchemaFactory.createForClass(Movie)
