import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'

export type TagDocument = HydratedDocument<Tag>

@Schema({ timestamps: true })
export class Tag {
  @Prop()
  name: string // Tên

  @Prop({ unique: true })
  slug: string // URL thân thiện

  @Prop()
  description: string // Mô tả
}
export const TagSchema = SchemaFactory.createForClass(Tag)
