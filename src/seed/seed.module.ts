import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { PockemonModule } from '../pockemon/pockemon.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [PockemonModule]
})
export class SeedModule {}
