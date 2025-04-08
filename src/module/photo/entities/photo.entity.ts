import { Category } from '@/module/category/entities/category.entity'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany,
} from 'typeorm'

@Entity()
export class Photo {
  @PrimaryGeneratedColumn({ name: 'photo_id', type: 'int' })
  id: number

  @Column({ length: 500 })
  name: string

  @Column('text')
  description: string

  @Column()
  filename: string

  @Column('int')
  views: number

  @Column()
  isPublished: boolean

  @ManyToMany((type) => Category, (catagory) => catagory.name)
  // @JoinTable()
  categories: Category
}
