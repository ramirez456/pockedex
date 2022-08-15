import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PockemonService } from './pockemon.service';
import { CreatePockemonDto } from './dto/create-pockemon.dto';
import { UpdatePockemonDto } from './dto/update-pockemon.dto';

@Controller('pockemon')
export class PockemonController {
  constructor(private readonly pockemonService: PockemonService) {}

  @Post()
  create(@Body() createPockemonDto: CreatePockemonDto) {
    return this.pockemonService.create(createPockemonDto);
  }

  @Get()
  findAll() {
    return this.pockemonService.findAll();
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
  remove(@Param('id') id: string) {
    return this.pockemonService.remove(id);
  }
}
