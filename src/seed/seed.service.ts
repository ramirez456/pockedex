import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { Pockemon } from 'src/pockemon/entities/pockemon.entity';
import { PokeResponse } from './interfaces/poke-respose.interface';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Pockemon.name)
    private readonly pockemonModel: Model<Pockemon>,
    private readonly http: AxiosAdapter
  ){}

  

  async executeSeed() {

    await this.pockemonModel.deleteMany({});

    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650')
    
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