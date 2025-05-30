import { Inject, Injectable } from '@nestjs/common'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { Repository } from 'typeorm'
import { Category } from './entities/category.entity'

@Injectable()
export class CategoryService {
  constructor(
    @Inject('CATEGORY_REPOSITORY')
    private categoryRepository: Repository<Category>,
  ) {}

  create(createCategoryDto: CreateCategoryDto) {
    return 'This action adds a new category'
  }

  findAll() {
    return `This action returns all category`
  }

  findOne(id: number) {
    return `This action returns a #${id} category`
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`
  }

  remove(id: number) {
    return `This action removes a #${id} category`
  }
}
