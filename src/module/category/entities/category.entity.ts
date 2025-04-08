import { Photo } from '@/module/photo/entities/photo.entity'
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('catagory')
export class Category {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 500 })
  name: string

  @ManyToMany(() => Photo, (photo) => photo.categories)
  @JoinTable()
  photos: Photo
}
