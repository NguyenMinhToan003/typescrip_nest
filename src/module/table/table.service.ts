import { Inject, Injectable } from '@nestjs/common'
import { CreateTableDto } from './dto/create-table.dto'
import { UpdateTableDto } from './dto/update-table.dto'
import { Repository } from 'typeorm'
import { Table } from './entities/table.entity'

@Injectable()
export class TableService {
  constructor(
    @Inject('TABLE_REPOSITORY')
    private tableRepository: Repository<Table>,
  ) {}
  create(createTableDto: CreateTableDto) {
    return this.tableRepository.save(createTableDto)
  }

  findAll() {
    return `This action returns all table`
  }

  findOne(id: number) {
    return `This action returns a #${id} table`
  }

  update(id: number, updateTableDto: UpdateTableDto) {
    return `This action updates a #${id} table`
  }

  remove(id: number) {
    return `This action removes a #${id} table`
  }
}
