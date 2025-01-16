import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'

export type BannerDocument = HydratedDocument<Banner>

@Schema({ timestamps: true })
export class Banner {
  @Prop()
  image_url: string // URL ảnh

  @Prop({ type: Types.ObjectId, ref: 'Movie' })
  movie_id: Types.ObjectId // ID phim

  @Prop()
  position: number // Vị trí
}
export const BannerSchema = SchemaFactory.createForClass(Banner)
