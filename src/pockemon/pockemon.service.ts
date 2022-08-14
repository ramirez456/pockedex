import { Injectable } from '@nestjs/common';
import { CreatePockemonDto } from './dto/create-pockemon.dto';
import { UpdatePockemonDto } from './dto/update-pockemon.dto';

@Injectable()
export class PockemonService {
  create(createPockemonDto: CreatePockemonDto) {
    return 'This action adds a new pockemon';
  }

  findAll() {
    return `This action returns all pockemon`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pockemon`;
  }

  update(id: number, updatePockemonDto: UpdatePockemonDto) {
    return `This action updates a #${id} pockemon`;
  }

  remove(id: number) {
    return `This action removes a #${id} pockemon`;
  }
}
