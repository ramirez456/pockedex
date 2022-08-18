import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios, { AxiosInstance } from 'axios';
import { Model } from 'mongoose';
import { Pockemon } from 'src/pockemon/entities/pockemon.entity';
import { PokeResponse } from './interfaces/poke-respose.interface';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Pockemon.name)
    private readonly pockemonModel: Model<Pockemon>
  ){}
  private readonly axios: AxiosInstance = axios;

  async executeSeed() {
    
    await this.pockemonModel.deleteMany({});

    const {data} = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650')
    
    const pockemonToInsert: {name: string, no: number}[]= []
    
    data.results.forEach(({name, url})=> {

      const segments = url.split('/')

      const no = +segments[segments.length-2];

      pockemonToInsert.push({name,no})

    })

    await this.pockemonModel.insertMany(pockemonToInsert);

    return 'seed excecute';
  }
}