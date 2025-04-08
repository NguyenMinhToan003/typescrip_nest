import { Module } from '@nestjs/common'
import { CategoryService } from './category.service'
import { CategoryController } from './category.controller'
import { DatabaseModule } from '@/database/database.module'
import { categoryProviders } from './category.provider'

@Module({
  imports: [DatabaseModule],
  controllers: [CategoryController],
  providers: [...categoryProviders, CategoryService],
})
export class CategoryModule {}
