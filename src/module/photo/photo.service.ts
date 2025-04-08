import { Inject, Injectable } from '@nestjs/common'
import { CreatePhotoDto } from './dto/create-photo.dto'
import { UpdatePhotoDto } from './dto/update-photo.dto'
import { Repository } from 'typeorm'
import { Photo } from './entities/photo.entity'

@Injectable()
export class PhotoService {
  constructor(
    @Inject('PHOTO_REPOSITORY')
    private photoRepository: Repository<Photo>,
  ) {}
  async create(createPhotoDto: CreatePhotoDto) {
    return await this.photoRepository.save(createPhotoDto)
  }

  findAll() {
    return this.photoRepository.find()
  }

  findOne(id: number) {
    return this.photoRepository.findOne({ where: { id } })
  }

  update(id: number, updatePhotoDto: UpdatePhotoDto) {
    return `This action updates a #${id} photo`
  }
  async average(id: number) {
    return await this.photoRepository.average('views')
  }
  remove(id: number) {
    return `This action removes a #${id} photo`
  }
}
