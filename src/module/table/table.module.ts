import { Module } from '@nestjs/common'
import { TableService } from './table.service'
import { TableController } from './table.controller'
import { tableProviders } from './table.provicer'
import { DatabaseModule } from '@/database/database.module'

@Module({
  imports: [DatabaseModule],
  controllers: [TableController],
  providers: [...tableProviders, TableService],
})
export class TableModule {}
