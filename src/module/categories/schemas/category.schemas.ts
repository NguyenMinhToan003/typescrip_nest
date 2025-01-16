import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'

export type CatagoryDocument = HydratedDocument<Catagory>

@Schema({ timestamps: true })
export class Catagory {
  @Prop()
  name: string // Tên

  @Prop({ unique: true })
  slug: string // URL thân thiện

  @Prop()
  description: string // Mô tả
}
export const CatagorySchema = SchemaFactory.createForClass(Catagory)
