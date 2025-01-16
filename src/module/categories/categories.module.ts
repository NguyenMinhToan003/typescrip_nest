import { Module } from '@nestjs/common'
import { CategoriesService } from './categories.service'
import { CategoriesController } from './categories.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { CatagorySchema } from './schemas/category.schemas'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Catagory', schema: CatagorySchema }]),
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
