import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PockemonService } from './pockemon.service';
import { CreatePockemonDto } from './dto/create-pockemon.dto';
import { UpdatePockemonDto } from './dto/update-pockemon.dto';
import { ParseMongoIdPipePipe } from '../common/pipes/parse-mongo-id-pipe.pipe';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('pockemon')
export class PockemonController {
  constructor(private readonly pockemonService: PockemonService) {}

  @Post()
  create(@Body() createPockemonDto: CreatePockemonDto) {
    return this.pockemonService.create(createPockemonDto);
  }

  @Get()
  findAll(@Query() paginationDto:PaginationDto) {
    return this.pockemonService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') termino: string) {
    return this.pockemonService.findOne(termino);
  }

  @Patch(':id')
  update(@Param('id') termino: string, @Body() updatePockemonDto: UpdatePockemonDto) {
    return this.pockemonService.update(termino, updatePockemonDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipePipe) id: string) {
    return this.pockemonService.remove(id);
  }
}
