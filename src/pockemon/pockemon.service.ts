import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, Delete } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Pockemon } from './entities/pockemon.entity';

import { CreatePockemonDto } from './dto/create-pockemon.dto';
import { UpdatePockemonDto } from './dto/update-pockemon.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import process from 'process';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class PockemonService {
  private defaultLimit: number
  constructor(
    @InjectModel(Pockemon.name)
    private readonly pockemonModel: Model<Pockemon>,
    private readonly configService: ConfigService
  ){
    this.defaultLimit = this.configService.get<number>('defaultLimit');
  }

  async create(createPockemonDto: CreatePockemonDto) {
    createPockemonDto.name = createPockemonDto.name.toLowerCase()
    try {
      const pockemon = await this.pockemonModel.create(createPockemonDto)
      return pockemon;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {

    let pockemons:Pockemon[];
    const {limit = this.defaultLimit, offset=0} = paginationDto
    pockemons = await this.pockemonModel.find().limit(limit).skip(offset).sort({no:1})
    
    return pockemons;
  }

  async findOne(termino: string) {

    let pockemon:Pockemon;
    
    if(!isNaN(+termino)) {
      pockemon = await this.pockemonModel.findOne({no: termino})
    }
    if(!pockemon && isValidObjectId(termino)){
      pockemon = await this.pockemonModel.findById(termino)
    }
    if(!pockemon){
      pockemon = await this.pockemonModel.findOne({name:termino})
    }
    if(!pockemon){
      throw new NotFoundException(`Pockemon with  termino,name or no ${termino} not found`);
    }
    return pockemon;
  }

  async update(termino: string, updatePockemonDto: UpdatePockemonDto) {
    let pockemon = await this.findOne(termino);
    if(updatePockemonDto.name){
      updatePockemonDto.name = updatePockemonDto.name.toLowerCase();
    }

    try {
      await pockemon.updateOne(updatePockemonDto);
    } catch (error) {
      this.handleExceptions(error);
    }
    
    return {...pockemon.toJSON(), ...updatePockemonDto};
  }

  async remove(id: string) {
    const {deletedCount} = await this.pockemonModel.deleteOne({_id: id});
    if(deletedCount === 0){
      throw new BadRequestException(`Pockemon with id ${id} no exist`);
    }
    return true;
  }

  private handleExceptions(error: any){
    if(error.code === 11000) {
      throw new BadRequestException(`Pockemon exists in db ${JSON.stringify(error.keyValue)}`)
    }else{
      console.log(error)
      throw new InternalServerErrorException(`can't  create Pockemon - check server logs`);
    }
  }
}