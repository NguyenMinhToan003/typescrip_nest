import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder,
  Req,
  Session,
} from '@nestjs/common'
import { TableService } from './table.service'
import { CreateTableDto } from './dto/create-table.dto'
import { UpdateTableDto } from './dto/update-table.dto'
import { Public } from '@/decorator/customize'
import {
  FileFieldsInterceptor,
  FileInterceptor,
  NoFilesInterceptor,
} from '@nestjs/platform-express'

@Controller('table')
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @Public()
  uploadFile(
    @Body() body: any,
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    console.log('file', file)
    return file.buffer.toString('utf-8')
  }

  @Get('session')
  @Public()
  getSession(@Session() session: Record<string, any>) {
    console.log('session', session)
    session.visited = session.visited || 0
    session.visited++
    return session
  }
  @Post()
  @Public()
  create(@Body() createTableDto: CreateTableDto) {
    return this.tableService.create(createTableDto)
  }

  @Get()
  @Public()
  findAll() {
    return this.tableService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tableService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTableDto: UpdateTableDto) {
    return this.tableService.update(+id, updateTableDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tableService.remove(+id)
  }
}
