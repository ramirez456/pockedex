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
  findOne(@Param('id') id: string) {
    return this.pockemonService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePockemonDto: UpdatePockemonDto) {
    return this.pockemonService.update(+id, updatePockemonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pockemonService.remove(+id);
  }
}
