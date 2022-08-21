import { Module } from '@nestjs/common';
import { PockemonService } from './pockemon.service';
import { PockemonController } from './pockemon.controller';
import mongoose from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Pockemon, PokemonSchema } from './entities/pockemon.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [PockemonController],
  providers: [PockemonService],
  imports:[
    ConfigModule,
    MongooseModule.forFeature([{
      name: Pockemon.name,
      schema: PokemonSchema
    }])
  ],
  exports:[
    MongooseModule
  ]
})
export class PockemonModule {}
