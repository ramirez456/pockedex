import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PockemonModule } from './pockemon/pockemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import {EnvConfigurations } from './config/app.config';
@Module({
  imports: [
    ConfigModule.forRoot({
      load:[EnvConfigurations]
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'),
    }),
    MongooseModule.forRoot(process.env.MONGODB),
    PockemonModule,
    CommonModule,
    SeedModule
  ],
})
export class AppModule {}
