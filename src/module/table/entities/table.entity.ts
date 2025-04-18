import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Table {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ length: 500 })
  name: string
}
