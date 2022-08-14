import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PockemonModule } from './pockemon/pockemon.module';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'),
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/nest_pokemon'),
    PockemonModule
  ],
})
export class AppModule {}
